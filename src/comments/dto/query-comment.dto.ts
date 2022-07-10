import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CommentFieldType } from '../schema/comment.schema';
import { Comment } from '../../types/comment';

type FieldType = Partial<Pick<Comment, 'content' | 'post'>>;

export class QueryCommentDto implements FieldType {
  @Transform(({ value }) => RegExp(value, 'i'))
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  post?: string;

  @IsString()
  @IsOptional()
  creator?: string;

  @IsNumber()
  @IsOptional()
  limit?: number = 5;

  // @Matches(/^\{ createdAt: '(-?1)' \}$/)
  @Transform(({ value }) => ({ createdAt: value }))
  @IsOptional()
  orderByCreatedAt? = '{ createdAt: -1 }';
}
