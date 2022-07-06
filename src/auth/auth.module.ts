import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from './schema/auth.schema';
import {
  RefreshTokenModel,
  RefreshTokenSchema,
} from './schema/refresh-token.schema';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthModel.name, schema: AuthSchema },
      { name: RefreshTokenModel.name, schema: RefreshTokenSchema },
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {
}
