import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Post } from '../../types/post';

type FieldType = Partial<Pick<Post, 'title' | 'tags' | 'categories' | 'creator'>>;

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
  @IsString({ each: true })
  tags?: string[];

  @Transform(({ value }) => ({
    $all: value.split(',').map((tag) => RegExp(tag, 'i'))
  }))
  @IsString({ each: true })
  categories?: string[];

  @IsNumber()
  @IsOptional()
  creator?: string;

  @IsNumber()
  @IsOptional()
  limit? = 5;

  // @Matches(/^\{ createdAt: '(-?1)' \}$/)
  @Transform(({ value }) => ({ createdAt: value }))
  @IsOptional()
  orderByCreatedAt? = '{ createdAt: -1 }';
}
