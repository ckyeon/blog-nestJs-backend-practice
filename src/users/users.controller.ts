import { Controller, Post } from '@nestjs/common';
import { JoinUserDto } from './dto/join-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { IAuthTokens } from './jwt/auth-tokens';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post('join')
  join(dto: JoinUserDto): Promise<boolean> {
    return this.usersService.join(dto);
  }

  @Post('login')
  login(dto: LoginUserDto): Promise<IAuthTokens> {
    return this.usersService.login(dto);
  }
}
