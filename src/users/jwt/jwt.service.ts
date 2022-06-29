import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TUserRole } from '../schema/enum/user-roles.enum';
import { sign } from 'jsonwebtoken';

export interface AccessTokenPayload {
  _id: string;
  role: TUserRole;
}

export interface RefreshTokenPayload {
  _id: string;
}

@Injectable()
export class JwtService {
  constructor(private readonly configurService: ConfigService) {
  }

  signAccessToken(payload: AccessTokenPayload): string {
    return sign(payload, this.configurService.get('JWT_SECRET'), {
      expiresIn: '1d',
      audience: 'blog.com',
      issuer: 'blog.com',
    });
  }

  signRefreshToken(payload: RefreshTokenPayload): string {
    return sign(payload, this.configurService.get('JWT_SECRET'), {
      expiresIn: '30d',
      audience: 'todo.com',
      issuer: 'todo.com',
    });
  }
}
