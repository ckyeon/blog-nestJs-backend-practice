import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsString()
  post: string;

  @IsString({ each: true })
  @IsOptional()
  attachments?: string[];

  @IsOptional()
  user?: string;
}
