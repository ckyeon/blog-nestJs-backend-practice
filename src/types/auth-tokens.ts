import { TUserRole } from '../auth/enum/user-roles.enum';

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAccessTokenPayload {
  _id: string;
  role: TUserRole;
}

export interface IRefreshTokenPayload {
  _id: string;
}