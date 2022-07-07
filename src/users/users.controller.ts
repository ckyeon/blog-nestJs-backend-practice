import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { JoinUserDto } from './dto/join-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AccessTokenPayload, AuthTokens } from '../types/auth-tokens';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { User } from '../decorators/user.decorator';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  @Post('join')
  join(@Body() dto: JoinUserDto): Promise<boolean> {
    return this.usersService.join(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User() user: AccessTokenPayload): Promise<AuthTokens> {
    return this.authService.login(user);
  }

  @Get('refresh-token')
  refreshToken(@Headers('x-refresh-token') token: string) {
    return this.usersService.refreshToken(token);
  }
}
