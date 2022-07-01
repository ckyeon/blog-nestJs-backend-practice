import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JoinUserDto } from './dto/join-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { IAuthTokens } from '../types/auth-tokens';
import { AuthService } from '../auth/auth.service';
import { ErrorCodes } from '../errors/error-definition';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService
  ) {
  }

  async join(dto: JoinUserDto): Promise<boolean> {
    const { email, password, name, phone } = dto;

    const exUserFindByEmail = await this.userModel.findOne({ email });
    if (exUserFindByEmail) {
      throw new BadRequestException(ErrorCodes.ALREADY_REGISTERED_EMAIL + ` ${email}`);
    }

    const exUserFindByPhone = await this.userModel.findOne({ phone });
    if (exUserFindByPhone) {
      throw new BadRequestException(ErrorCodes.ALREADY_REGISTERED_PHONE + ` ${phone}`);
    }

    const user = await this.userModel.create({ email, name, phone });
    const auth = await this.authService.createAuthentication(user, password);

    user.auth = auth._id;
    await user.save();
    return true;
  }

  async login(dto: LoginUserDto): Promise<IAuthTokens> {
    const { email, password } = dto;
    const exUser = await this.userModel.findOne({ email });

    if (!exUser) {
      throw new NotFoundException(ErrorCodes.NOT_FOUND_USER);
    }

    if (!(await this.authService.authenticate(exUser.auth, password))) {
      throw new UnauthorizedException(ErrorCodes.INVALID_PASSWORD);
    }

    const { _id, role } = exUser;
    const accessToken = this.authService.signAccessToken({ _id, role });
    const refreshToken = await this.authService.signRefreshToken(_id);
    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<IAuthTokens> {
    const userId = await this.authService.getUserIdByRefreshToken(refreshToken);
    const user = await this.userModel.findById(userId);
    const payload = { _id: user._id, role: user.role };
    return this.authService.refreshToken(refreshToken, payload);
  }
}

