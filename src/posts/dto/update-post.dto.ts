import { IsOptional, IsString } from 'class-validator';
import { Post } from '../../types/post';

type FieldType = Partial<Pick<Post, 'title' | 'categories' | 'tags' | 'body' | 'attachments'>>;

export class UpdatePostDto implements FieldType {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString({ each: true })
  @IsOptional()
  categories?: string[];

  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  body?: string;

  @IsString({ each: true })
  @IsOptional()
  attachments?: string[] | null;
}
