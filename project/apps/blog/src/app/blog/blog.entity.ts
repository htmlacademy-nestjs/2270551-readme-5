import {Blog, BlogContent, BlogStatus, BlogType} from '@project/libs/shared/app-types'

export class BlogEntity implements Blog {
  public type: BlogType;
  public id?: string;
  public content: BlogContent;
  public createdDate?: Date;
  public postedDate?: Date;
  public status?: BlogStatus;
  public userId: string;
  public tags?: string[];
  public repost?: boolean;
  public repostId?: string;
  public repostUserId?: string;
  public categories: [];

  constructor(blog: Blog) {
    this.populate(blog);
  }


  public toPOJO() {
    return {
      type: this.type,
      id: this.id,
      userId: this.userId,
      createdDate: this.createdDate,
      postedDate: this.postedDate,
      repost: this.repost,
      repostId: this.repostId,
      repostUserId: this.repostUserId,
      status: this.status,
      tags: this.tags,
      content: this.content,
      categories: []
    };
  }

  public populate(data: Blog): void {
    this.type = data.type;
    this.id = data.id;
    this.userId = data.userId;
    this.createdDate = data.createdDate;
    this.postedDate = data.postedDate;
    this.repost = data.repost;
    this.repostId = data.repostId;
    this.repostUserId = data.repostId;
    this.status = data.status;
    this.tags = data.tags;
    this.content = data.content;
  }

  static fromObject(data: Blog): BlogEntity {
    return new BlogEntity(data);
  }
}
