import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../../users/dto/login-user.dto';
import { AccessTokenPayload } from '../../types/auth-tokens';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<AccessTokenPayload> {
    const loginUserDto: LoginUserDto = { email, password };
    return await this.authService.validateUser(loginUserDto);
  }
}