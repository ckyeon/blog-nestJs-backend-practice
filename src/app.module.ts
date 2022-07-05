import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap
} from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { LoggingModule } from './logging/logging.module';
import Config from './config';
import { Connection } from 'mongoose';
import adminConfig from './config/admin.config';
import { hashSync } from 'bcrypt';
import { MulterConfigService } from './uploads/multer-config/multer-config.service';
import { UploadsController } from './uploads/uploads.controller';
import { UploadsService } from './uploads/uploads.service';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    PostsModule,
    CommentsModule,
    UsersModule,
    AuthModule,
    LoggingModule,
    UploadsModule,
    Config,

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI')
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @Inject(adminConfig.KEY) private readonly config: ConfigType<typeof adminConfig>
  ) {
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  onApplicationBootstrap() {
    this.createAdmin();
  }

  private async createAdmin(): Promise<void> {
    const { Auth, User } = this.connection.models;
    const { email, name, phone, password } = this.config;
    const exAdmin = await User.findOne({ email });

    if (!exAdmin) {
      const user = await User.create({ email, name, phone, role: 'admin' });
      const auth = await Auth.create({
        provider: 'local',
        providerId: String(user._id),
        password: hashSync(password, 12),
        user: user._id
      });
      user.auth = auth._id;
      await user.save();
    }
  }
}
