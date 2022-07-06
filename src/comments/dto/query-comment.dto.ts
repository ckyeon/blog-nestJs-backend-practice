import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { CommentFieldType } from '../schema/comment.schema';

export class QueryCommentDto implements CommentFieldType{
  @Transform(({ value }) => RegExp(value, 'i'))
  @IsOptional()
  content: string;

  @IsOptional()
  post: string;

  @IsOptional()
  creator: string;

  @IsOptional()
  limit: number = 5;

  // @Matches(/^\{ createdAt: '(-?1)' \}$/)
  @IsOptional()
  @Transform(({ value }) => ({ createdAt: value }))
  orderByCreatedAt: string = '{ createdAt: -1 }';
}
