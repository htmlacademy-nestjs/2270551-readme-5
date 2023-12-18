import { Injectable } from '@nestjs/common';
import {BaseMemoryRepository} from '@project/libs/shared/core';
import { BlogEntity } from './blog.entity';

@Injectable()
export class BlogRepository extends BaseMemoryRepository<BlogEntity> {}
