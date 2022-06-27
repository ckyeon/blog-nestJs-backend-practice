import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PostsModule, CommentsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
