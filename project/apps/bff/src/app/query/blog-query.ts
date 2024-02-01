import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import { DEFAULT_PAGE_COUNT, DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT, DEFAULT_SORT_DIRECTION } from '../constants';
import { BlogType, SortDirection, SortType } from '@project/libs/shared/app-types';

export class BlogQuery {
  @IsIn(Object.values(BlogType))
  @IsOptional()
  public type?: BlogType;

  @IsOptional()
  @IsString()
  public search?: string;

  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  @IsString()
  public tag?: string;

  @IsIn(Object.values(SortType))
  @IsOptional()
  public sort?: SortType = DEFAULT_SORT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public direction?: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page?: number = DEFAULT_PAGE_COUNT;

  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public pageSize?: number = DEFAULT_POST_COUNT_LIMIT;
}
