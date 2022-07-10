import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CommentFieldType } from '../schema/comment.schema';
import { Comment } from '../../types/comment';

type FieldType = Pick<Comment, 'content' | 'creator' | 'post'> & Partial<Pick<Comment, 'attachments'>>;

export class CreateCommentDto implements FieldType {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString({ each: true })
  @IsOptional()
  attachments?: string[] | null;

  @IsEmpty()
  creator: string;

  @IsString()
  @IsNotEmpty()
  post: string;
}
