import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryCommentDto {
  @Transform(({ value }) => RegExp(value, 'i'))
  @IsOptional()
  content?: string;

  @IsOptional()
  post?: string;

  @IsOptional()
  user?: string;
}
