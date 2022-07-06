import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { PostFieldType } from '../schema/post.schema';

type FieldType = Pick<PostFieldType, 'title' | 'categories' | 'tags' | 'body' | 'attachments'>;

export class UpdatePostDto implements FieldType {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString({ each: true })
  categories: string[];

  @IsOptional()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsString()
  body: string;

  @IsString({ each: true })
  @IsOptional()
  attachments: string[] | null;
}
