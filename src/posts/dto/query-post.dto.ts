import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PostFieldType } from '../schema/post.schema';

type FieldType = Partial<Pick<PostFieldType, 'title' | 'tags' | 'categories' | 'creator'>>;

export class QueryPostDto implements FieldType {
  @Transform(({ value }) => RegExp(value))
  @IsOptional()
  title?: string;

  // 본문으로 검색하려면 검색엔진을 붙이는 것이 좋음
  // @Transform(({ value }) => RegExp(value))
  // @IsOptional()
  // body?: string;

  @Transform(({ value }) => ({
    $all: value.split(',').map((tag) => RegExp(tag, 'i'))
  }))
  @IsOptional()
  tags?: string[];

  @Transform(({ value }) => ({
    $all: value.split(',').map((tag) => RegExp(tag, 'i'))
  }))
  @IsOptional()
  categories?: string[];

  @IsOptional()
  creator?: string;

  @IsOptional()
  limit? = 5;

  // @Matches(/^\{ createdAt: '(-?1)' \}$/)
  @IsOptional()
  @Transform(({ value }) => ({ createdAt: value }))
  orderByCreatedAt? = '{ createdAt: -1 }';
}
