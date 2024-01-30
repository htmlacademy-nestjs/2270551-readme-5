import {AuthUser, UserStatus} from '@project/libs/shared/app-types'
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUND } from './blog-user.constants';
import {Document} from 'mongoose'
import { BlogUserModel } from './blog-user.model';
export class BlogUserEntity implements AuthUser {
  public passwordHash: string;
  public id?: string;
  public email: string;
  public name: string;
  public avatarId: string;
  public createdAt: Date;

  constructor(user: AuthUser) {
    this.populate(user);
  }
  cteatedAt: Date;
  firstname: string;
  lastname: string;
  avatar?: string;
  status: UserStatus;
  postsCount?: number;
  subscribersCount?: number;

  public toPOJO() {
    return {
      passwordHash: this.passwordHash,
      id: this.id,
      email: this.email,
      name: this.name,
      avatarId: this.avatarId,
      createdAt: this.createdAt
    };
  }

  public populate(data: AuthUser): void {
    this.avatarId = data.avatar;
    this.email = data.email;
    this.name = data.name;
    this.id = data.id;
    this.passwordHash = data.passwordHash;
    this.createdAt = data.cteatedAt ?? new Date();
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUND);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: BlogUserModel): BlogUserEntity {
    return new BlogUserEntity({...data, id: data._id});
  }
}
