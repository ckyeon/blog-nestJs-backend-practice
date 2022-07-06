import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CommentFieldType } from '../schema/comment.schema';

export class CreateCommentDto implements CommentFieldType {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString({ each: true })
  @IsOptional()
  attachments: string[] | null;

  @IsEmpty()
  creator: string;

  @IsString()
  @IsNotEmpty()
  post: string;
}
