import { Injectable } from '@nestjs/common';
import {BaseMemoryRepository} from '@project/libs/shared/core';
import { VideoBlogEntity } from './video-blog.entity';

@Injectable()
export class VideoBlogRepository extends BaseMemoryRepository<VideoBlogEntity> {}
