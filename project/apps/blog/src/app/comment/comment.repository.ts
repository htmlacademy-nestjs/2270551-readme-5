import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/libs/shared/core';
import { PrismaClientService } from '@project/libs/shared/blog/models';
import { Comment } from '@project/libs/shared/app-types';
import { CommentEntity } from './comment.entity';
import { CommentQuery } from './query/comment-query';
import { CommentsWithPaginationRdo } from './rdo/comments.rdo';

@Injectable()
export class CommentRepository extends BasePostgresRepository<CommentEntity, Comment> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, CommentEntity.fromObject);
  }


  public async save(entity: CommentEntity): Promise<CommentEntity> {
    const record = await this.client.comment.create({
      data: {
        message: entity.message,
        userId: entity.userId,
        blogId: entity.blogId,
      },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<CommentEntity> {
    const comment = await this.client.comment.findUnique({
      where: {
        id
      }
    });
    if (comment === null) {
      throw new NotFoundException()
    }
    const commentEntity = new CommentEntity();
    return commentEntity;
  }

  public async find(blogId: string, query: CommentQuery): Promise<CommentsWithPaginationRdo> {
    const {page, pageSize} = query;
    const skip = (page - 1) * pageSize;
    const totalItems = await this.client.comment.count({
      where: {
        blogId
      }
    });
    const totalPages = Math.ceil(totalItems / pageSize);
    const comments = await this.client.comment.findMany({
      where: {
        blogId
      },
      skip,
      take: pageSize,
    });
    const data = {data: comments, pagination: {currentPage: page , itemsPerPage: pageSize, totalItems, totalPages }};
    return data;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id
      }
    });
    return null;
  }
}
