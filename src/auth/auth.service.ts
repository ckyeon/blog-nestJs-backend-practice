import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AuthModel, AuthDocument } from './schema/auth.schema';
import { Connection, Model } from 'mongoose';
import { User } from '../types/user';
import { compareSync, hashSync } from 'bcrypt';
import { Auth } from '../types/auth';
import { v4 as uuidV4 } from 'uuid';
import {
  RefreshTokenModel,
  RefreshTokenDocument
} from './schema/refresh-token.schema';
import { AccessTokenPayload, AuthTokens } from '../types/auth-tokens';
import { ErrorCodes } from '../errors/error-definition';
import authConfig from '../config/auth.config';
import { UserModel } from '../users/schema/user.schema';
import { LoginUserDto } from '../users/dto/login-user.dto';
import {
  NotFoundUserException
} from '../exceptions/NotFoundUserException';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(AuthModel.name) private readonly authModel: Model<AuthDocument>,
    @InjectModel(RefreshTokenModel.name) private readonly refreshTokenModel: Model<RefreshTokenDocument>,
    @Inject(authConfig.KEY) private readonly config: ConfigType<typeof authConfig>,
    private readonly jwtService: JwtService
  ) {
  }

  async login(user: AccessTokenPayload): Promise<AuthTokens> {
    return {
      accessToken: await this.signAccessToken(user),
      refreshToken: await this.signRefreshToken(user._id)
    };
  }

  async validateUser(loginUser: LoginUserDto): Promise<AccessTokenPayload> {
    const { UserModel, AuthModel } = this.connection.models;
    const { email, password } = loginUser;

    const exUser = await UserModel.findOne({ email });
    if (!exUser) {
      throw new NotFoundUserException(email);
    }

    const exAuth: AuthDocument = await AuthModel.findById(exUser.auth);
    if (!exAuth.validatePassword(password)) {
      throw new UnauthorizedException(ErrorCodes.INVALID_PASSWORD);
    }

    return {
      _id: exUser._id,
      role: exUser.role
    };
  }

  createAuthentication(userId: string, password: string): Promise<AuthDocument> {
    return this.authModel.create({
      providerId: String(userId),
      password: password,
      creator: userId
    });
  }

  async authenticate(authId: string, password: string): Promise<boolean> {
    const exAuth = await this.authModel.findById(authId);
    return compareSync(password, exAuth.password);
  }

  async signAccessToken(payload: AccessTokenPayload): Promise<string> {
    return this.jwtService.sign(payload, {
      audience: 'blog.com',
      issuer: 'blog.com'
    });
  }

  async signRefreshToken(userId: string): Promise<string> {
    const token = uuidV4();
    await this.refreshTokenModel.create({ creator: userId, value: token });
    return token;
  }

  async getUserIdByRefreshToken(refreshToken: string): Promise<string> {
    const document = await this.refreshTokenModel.findOne({ value: refreshToken });
    if (!document) {
      throw new UnauthorizedException('유효한 리프레쉬 토큰이 아닙니다.');
    }

    return document.creator;
  }

  async refreshToken(refreshToken: string, accessTokenPayload: AccessTokenPayload): Promise<AuthTokens> {
    const document = await this.refreshTokenModel.findOne({
      value: refreshToken
    });
    await document.deleteOne();

    const aToken = await this.signAccessToken(accessTokenPayload);
    const rToken = await this.signRefreshToken(accessTokenPayload._id);
    const tokens: AuthTokens = { accessToken: aToken, refreshToken: rToken };
    return tokens;
  }

  // 토큰 만료되었는지 체크
  verifyToken(token: string): AccessTokenPayload {
    try {
      const {
        _id,
        role
      } = verify(token, this.config.jwtSecret) as AccessTokenPayload;
      return { _id, role };
    } catch (e) {
      const message =
        e.name === 'TokenExpiredError' ? ErrorCodes.ACCESS_TOKEN_EXPIRED : '유효하지 않은 액세스토큰입니다.';
      throw new UnauthorizedException(message);
    }
  }
}
