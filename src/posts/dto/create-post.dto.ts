import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PostFieldType } from '../schema/post.schema';
import { Post } from '../../types/post';

type FieldType = Pick<Post, 'title' | 'categories' | 'tags' | 'body' | 'creator'> & Partial<Pick<Post, 'attachments'>>;

export class CreatePostDto implements FieldType {
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
