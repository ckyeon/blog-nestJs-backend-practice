import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from './schema/auth.schema';
import {
  RefreshTokenModel,
  RefreshTokenSchema
} from './schema/refresh-token.schema';
import { AuthGuard } from './guards/auth.guard';
import { LocalStrategy } from './strategies/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthModel.name, schema: AuthSchema },
      { name: RefreshTokenModel.name, schema: RefreshTokenSchema }
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOption: { expiresIn: '1d' }
      })
    }),
    PassportModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {
}
