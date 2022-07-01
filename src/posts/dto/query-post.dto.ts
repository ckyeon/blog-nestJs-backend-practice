import { IsOptional, IsString } from 'class-validator';
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
}
