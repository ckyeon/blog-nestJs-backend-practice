import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsString({ each: true })
  @IsOptional()
  attachments: string[];
}