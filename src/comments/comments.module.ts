import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostsModule } from '../posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schema/comment.schema';
import { BPost, PostSchema } from '../posts/schema/post.schema';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: BPost.name, schema: PostSchema },
    ])
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
