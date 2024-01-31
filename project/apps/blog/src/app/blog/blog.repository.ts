import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/libs/shared/core';
import { BlogEntity } from './blog.entity';
import { Blog, BlogStatus, BlogType } from '@project/libs/shared/app-types';
import { PrismaClientService } from '@project/libs/shared/blog/models';
import { BaseBlogContentService } from './base-blog/blog.service';
import { baseBlogEntityFactory } from './base-blog/base-blog.factory';
import { blogFilter, blogSort } from './utils';
import { BlogPostWithPaginationRdo } from './rdo/blogs.rdo';
import { BlogQuery } from './query/blog-query';
import { BlogItemRdo } from './rdo/blog-item.rdo';

@Injectable()
export class BlogRepository extends BasePostgresRepository<BlogEntity, Blog> {
  constructor(
    protected readonly client: PrismaClientService,
    private readonly baseBlogContentService: BaseBlogContentService
  ) {
    super(client, BlogEntity.fromObject);
  }


  public async save(entity: BlogEntity): Promise<BlogEntity> {
    const {content, ... data } = entity.toPOJO();
    const transactionResult = await this.client.$transaction(async (prisma) => {

      const record = await this.client.blog.create({
        data: {
          type: entity.type,
          userId: entity.userId,
          tags: entity.tags,
        }
      });
      const baseBlogContentEntity = baseBlogEntityFactory(entity.type, {...entity.content, blogId: record.id});
      const newContent = await this.baseBlogContentService.save(entity.type, baseBlogContentEntity);
      return new BlogEntity({
        ...record,
        content: newContent,
        categories: [],
        type: record.type as BlogType,
        status: record.status as BlogStatus
      })
    })
    return transactionResult;
  }

  public async find(param: BlogQuery): Promise<BlogPostWithPaginationRdo> {
    let {type, page, pageSize, sort, direction, search, tag} = param;
    const filter = blogFilter({type, search, tag});
    const orderBy = blogSort({sort, direction});
    if (search) {
      pageSize = 20;
    }
    const skip = (page - 1) * pageSize;
    const totalItems = await this.client.blog.count({
      where: filter
    });
    const totalPages = Math.ceil(totalItems / pageSize);
    const blogs = await this.client.blog.findMany({
      include: {
        textBlog: true,
        quoteBlog: true,
        videoBlog: true,
        linkBlog: true,
        photoBlog: true,
        comments: true,
        likes: true,
      },
      where: filter,
      orderBy,
      skip,
      take: pageSize,
    });

    const blogWithExtraData: BlogItemRdo[] = blogs.map(blog => {
      const {videoBlog, photoBlog, quoteBlog, comments, likes, textBlog, linkBlog, ...entity} = blog;
      const MAP = {
        video: videoBlog,
        text: textBlog,
        link: linkBlog,
        quote: quoteBlog,
        photo: photoBlog
      } as const;

      const blogEntity = new BlogEntity({
        ...entity,
        content: MAP[blog.type],
        categories: [],
        type: entity.type as BlogType,
        status: entity.status as BlogStatus
      });
      return { ...blogEntity.toPOJO(), likes: likes.length ?? 0, comments: comments.length ?? 0 };
    })
    const data = {data: blogWithExtraData, pagination: {currentPage: page , itemsPerPage: pageSize, totalItems, totalPages }};
    return data;
  }

  public async findById(id: string): Promise<BlogEntity> {
    const blog = await this.client.blog.findUnique({
      where: {id},
      include: {
        textBlog: true,
        quoteBlog: true,
        videoBlog: true,
        linkBlog: true,
        photoBlog: true,
        comments: true,
        likes: true,
      },
    });
    if (blog === null) {
      throw new NotFoundException();
    }
    const {videoBlog, photoBlog, quoteBlog, comments, likes, textBlog, linkBlog, ...entity} = blog;
    const MAP = {
      video: videoBlog,
      text: textBlog,
      link: linkBlog,
      quote: quoteBlog,
      photo: photoBlog
    } as const;

    const blogEntity = new BlogEntity({
      ...entity,
      content: MAP[blog.type],
      categories: [],
      type: entity.type as BlogType,
      status: entity.status as BlogStatus
    });
    return blogEntity;
  }

  public async findUserInfo(id: string): Promise<number> {
    const blogCount = await this.client.blog.count({
      where: {userId: id},
    });


    return blogCount;
  }

  public async updateById(id: string, entity: BlogEntity, newBlogEntity: BlogEntity): Promise<BlogEntity> {
    const isChangeType = entity.type !== newBlogEntity.type;
    let updateBlogInfo: Record<string, unknown> = {
      type: newBlogEntity.type,
      tags: newBlogEntity.tags,
      status: newBlogEntity.status
    }

    if (entity.status === BlogStatus.Draft && newBlogEntity.status === BlogStatus.Public) {
      updateBlogInfo.postedDate = new Date();
    }
    const transactionResult = await this.client.$transaction(async (prisma) => {
      let blog;
      let content;
      const baseBlogContentEntity = baseBlogEntityFactory(newBlogEntity.type, {...newBlogEntity.content, blogId: id});
      blog = await prisma.blog.update({
        where: {id},
        data: updateBlogInfo
      })
      if (isChangeType) {
        await this.baseBlogContentService.deleteById(entity.type, id);
        content = await this.baseBlogContentService.save(newBlogEntity.type, baseBlogContentEntity);
      } else {
        content = await this.baseBlogContentService.update(newBlogEntity.type, id, baseBlogContentEntity);
      }
      blog.content = content
      return blog;
    })
    return transactionResult;
  }

  public async deleteById(id: string): Promise<null> {
    await this.client.blog.delete({
      where: {id},
    });

    return null;
  }

  public async repostById(userId: string, blog: BlogEntity): Promise<BlogEntity> {
    const existRepostedBlog = await this.client.blog.findFirst({
      where: {
        userId,
        repostId: blog.id
      }
    });
    if (existRepostedBlog) {
      throw new BadRequestException();
    }

    const {content: {id: contentId, ...contentWithoutId}, id, ...data } = blog.toPOJO();
    const newBlogEntity = new BlogEntity({
      ...data,
      content: contentWithoutId,
      createdDate: new Date(),
      postedDate: new Date(),
      userId,
      repost: true,
      categories: [],
      repostId: id,
    });
    const repostBlogEntity = await this.save(newBlogEntity);
    return repostBlogEntity;
  }

  public async findNew(date: Date): Promise<string[]> {
    const blogs = await this.client.blog.findMany({
      where: {createdDate: {gt: date}}
    });
    const newBlogId = blogs.map(blog => blog.id)
    return newBlogId;
  }
}
