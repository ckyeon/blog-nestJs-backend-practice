import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString({ each: true })
  categories?: string[];

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  body?: string;

  @IsString({ each: true })
  @IsOptional()
  attachments?: string[];
}
