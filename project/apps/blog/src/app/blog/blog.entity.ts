import {Blog, BlogContent, BlogStatus, BlogType} from '@project/libs/shared/app-types'
import { Category } from '@project/libs/shared/app/types';
import { PrismaClientService } from '@project/libs/shared/blog/models';

export class BlogEntity implements Blog {
  static fromObject(client: PrismaClientService, fromObject: any) {
    throw new Error('Method not implemented.');
  }
  public type: BlogType;
  public id: string;
  public contentId: string;
  public createdDate: Date;
  public postedDate: Date;
  public status: BlogStatus;
  public userId: string;
  public tags: string[];
  public repost: boolean;
  public repostId: string;
  public content: BlogContent;

  constructor(blog: Blog) {
    this.populate(blog);
  }
  categories: Category[];


  public toPOJO() {
    return {
      type: this.type,
      id: this.id,
      userId: this.userId,
      contentId: this.contentId,
      createdDate: this.createdDate,
      postedDate: this.postedDate,
      repost: this.repost,
      repostId: this.repostId,
      status: this.status,
      tags: this.tags,
      categories: this.categories,
      content: this.content,
    };
  }

  public populate(data: Blog): void {
    this.type = data.type;
    this.id = data.id;
    this.userId = data.userId;
    this.content = data.content;
    this.createdDate = data.createdDate;
    this.postedDate = data.postedDate;
    this.repost = data.repost;
    this.repostId = data.repostId;
    this.status = data.status;
    this.tags = data.tags;
  }

  public repostBlog(data: {repostId: string}) {
    this.repost = true;
    this.createdDate = new Date();
    this.postedDate = new Date();
    this.repostId = data.repostId;
  }
}
