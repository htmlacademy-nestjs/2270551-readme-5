import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public message: string;

  @Expose()
  public userId: string;

  @Expose()
  public blogId: string;

  @Expose()
  public id: string;

  @Expose()
  public createdAt: Date;
}
