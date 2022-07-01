import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { JoinUserDto } from './dto/join-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { IAuthTokens } from '../types/auth-tokens';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post('join')
  join(@Body() dto: JoinUserDto): Promise<boolean> {
    return this.usersService.join(dto);
  }

  @Post('login')
  login(@Body() dto: LoginUserDto): Promise<IAuthTokens> {
    return this.usersService.login(dto);
  }

  @Get('refresh-token')
  refreshToken(@Headers('x-refresh-token') token: string) {
    return this.usersService.refreshToken(token);
  }
}
