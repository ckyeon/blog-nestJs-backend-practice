import { TUserRole } from '../auth/enum/user-roles.enum';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AccessTokenPayload {
  _id: string;
  role: TUserRole;
}

export interface IRefreshTokenPayload {
  _id: string;
}