import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryPostDto {
  @Transform(({ value }) => RegExp(value))
  @IsOptional()
  title?: string;

  @Transform(({ value }) => RegExp(value))
  @IsOptional()
  body?: string;

  @Transform(({ value }) => ({
    $all: value.split(',').map((tag) => RegExp(tag, 'i')),
  }))
  @IsOptional()
  tags?: string[];

  @Transform(({ value }) => ({
    $all: value.split(',').map((tag) => RegExp(tag, 'i')),
  }))
  @IsOptional()
  categories?: string[];

  @IsOptional()
  user?: string;

  @IsOptional()
  limit?: number = 5;

  // @Matches(/^\{ createdAt: '(-?1)' \}$/)
  @IsOptional()
  @Transform(({ value }) => ({ createdAt: value }))
  orderByCreatedAt?: string = '{ createdAt: -1 }';
}
