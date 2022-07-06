import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostsModule } from '../posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModel, CommentSchema } from './schema/comment.schema';
import { PostModel, PostSchema } from '../posts/schema/post.schema';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    UploadsModule,
    MongooseModule.forFeature([
      { name: CommentModel.name, schema: CommentSchema },
      { name: PostModel.name, schema: PostSchema }
    ])
  ],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {
}
