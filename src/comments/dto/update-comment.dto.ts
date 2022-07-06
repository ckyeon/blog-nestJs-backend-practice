import { IsOptional, IsString } from 'class-validator';
import { CommentFieldType } from '../schema/comment.schema';

type FieldType = Pick<CommentFieldType, 'content' | 'attachments'>;

export class UpdateCommentDto implements FieldType {
  @IsString()
  @IsOptional()
  content: string;

  @IsString({ each: true })
  @IsOptional()
  attachments: string[];
}
