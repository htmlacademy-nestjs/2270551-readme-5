import { Injectable } from '@nestjs/common';
import {BaseMemoryRepository} from '@project/libs/shared/core';
import { TextBlogEntity } from './text-blog.entity';

@Injectable()
export class TextBlogRepository extends BaseMemoryRepository<TextBlogEntity> {}
