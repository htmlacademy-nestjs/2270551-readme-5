import {AuthUser, UserStatus} from '@project/libs/shared/app-types'
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUND } from './blog-user.constants';
import { BlogUserModel } from './blog-user.model';
import { Entity } from '@project/libs/shared/core';
export class BlogUserEntity implements AuthUser, Entity<string> {
  public passwordHash: string;
  public id?: string;
  public email: string;
  public name: string;
  public lastname: string;
  public firstname: string;
  public avatar: string;
  public createdAt: Date;

  constructor(user: AuthUser) {
    this.populate(user);
  }
  status: UserStatus;
  postsCount?: number;
  subscribersCount?: number;

  public toPOJO() {
    return {
      passwordHash: this.passwordHash,
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      firstname: this.firstname,
      lastname: this.lastname,
      status: UserStatus.User,
      createdAt: this.createdAt
    };
  }

  public populate(data: AuthUser): void {
    this.avatar = data.avatar;
    this.email = data.email;
    this.name = data.name;
    this.id = data.id;
    this.passwordHash = data.passwordHash;
    this.createdAt = data.createdAt ?? new Date();
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
