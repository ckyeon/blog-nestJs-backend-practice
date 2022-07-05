import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString({ each: true })
  categories: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsString({ each: true })
  @IsOptional()
  attachments?: string[];

  @IsOptional()
  user: string;
}