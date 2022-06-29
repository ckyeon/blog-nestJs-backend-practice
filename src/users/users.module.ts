import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from './jwt/jwt.service';
import { Auth, AuthSchema } from './schema/auth.schema';
import { User, UserSchema } from './schema/user.schema';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schema/refresh-token.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  providers: [UsersService, JwtService, ConfigService],
  controllers: [UsersController],
})
export class UsersModule {}
