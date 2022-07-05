import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import { Model } from 'mongoose';
import { IUser } from '../types/user';
import { compareSync, hashSync } from 'bcrypt';
import { IAuth } from '../types/auth';
import { v4 as uuidV4 } from 'uuid';
import { RefreshToken, RefreshTokenDocument } from './schema/refresh-token.schema';
import { IAccessTokenPayload, IAuthTokens} from '../types/auth-tokens';
import { ErrorCodes } from '../errors/error-definition';
import authConfig from '../config/auth.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshTokenDocument>,
    @Inject(authConfig.KEY) private readonly config: ConfigType<typeof authConfig>
  ) {}

  createAuthentication(user: IUser, password: string | Buffer): Promise<IAuth> {
    return this.authModel.create({
      providerId: String(user._id),
      password: hashSync(password, 12),
      user: user._id
    });
  }

  async authenticate(authId: string, password: string) {
    const exAuth = await this.authModel.findById(authId);
    return compareSync(password, exAuth.password);
  }

  signAccessToken(payload: IAccessTokenPayload): string {
    return sign(payload, this.config.jwtSecret, {
      expiresIn: '1d',
      audience: 'blog.com',
      issuer: 'blog.com'
    });
  }

  async signRefreshToken(userId: string): Promise<string> {
    const token = uuidV4();
    await this.refreshTokenModel.create({ user: userId, value: token });
    return token;
  }

  async getUserIdByRefreshToken(refreshToken: string): Promise<string> {
    const document = await this.refreshTokenModel.findOne({ value: refreshToken });
    if (!document) {
      throw new UnauthorizedException('유효한 리프레쉬 토큰이 아닙니다.');
    }

    return document.user;
  }

  async refreshToken(refreshToken: string, accessTokenPayload: IAccessTokenPayload): Promise<IAuthTokens> {
    const document = await this.refreshTokenModel.findOne({
      value: refreshToken
    });
    await document.deleteOne();

    const aToken = this.signAccessToken(accessTokenPayload);
    const rToken = await this.signRefreshToken(accessTokenPayload._id);
    const tokens: IAuthTokens = { accessToken: aToken, refreshToken: rToken };
    return tokens;
  }

  // 토큰 만료되었는지 체크
  verifyToken(token: string): IAccessTokenPayload {
    try {
      const { _id, role } = verify(token, this.config.jwtSecret) as IAccessTokenPayload;
      return { _id, role };
    } catch (e) {
      const message =
        e.name === 'TokenExpiredError' ? ErrorCodes.ACCESS_TOKEN_EXPIRED : '유효하지 않은 액세스토큰입니다.';
      throw new UnauthorizedException(message);
    }
  }
}
