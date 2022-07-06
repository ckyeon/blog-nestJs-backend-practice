import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PostFieldType } from '../schema/post.schema';

export class CreatePostDto implements PostFieldType {
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
  attachments?: string[] | null;

  @IsOptional()
  creator: string;
}
