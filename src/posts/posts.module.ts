import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BPost, PostSchema } from './schema/post.schema';
import { AuthModule } from '../auth/auth.module';
import { UploadsModule } from '../uploads/uploads.module';
import { UploadsService } from '../uploads/uploads.service';

@Module({
  imports: [
    AuthModule,
    UploadsModule,
    MongooseModule.forFeature([{ name: BPost.name, schema: PostSchema }])
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {
}
