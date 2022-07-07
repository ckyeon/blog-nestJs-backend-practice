import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from '../../config/auth.config';
import { ConfigType } from '@nestjs/config';
import { AccessTokenPayload } from '../../types/auth-tokens';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(authConfig.KEY) private readonly config: ConfigType<typeof authConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret
    });
  }

  async validate(payload: AccessTokenPayload): Promise<AccessTokenPayload> {
    return payload;
  }
}
