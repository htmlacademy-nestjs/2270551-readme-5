import { AuthUser,User,UserStatus } from '@project/libs/shared/app-types';
import { Entity } from '@project/libs/shared/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

 export class BlogUserEntity implements AuthUser, Entity<string> {
   public id?: string;
   public email: string;
   public firstname: string;
   public lastname: string;
   public avatar?: string;
   public status: UserStatus;
   public passwordHash: string;
   //public postsCount?: number;
   //public subscribersCount?: number;

   constructor(user: AuthUser) {
     this.populate(user)
   }

   public populate(user: AuthUser): void {
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.avatar = user.avatar;
    this.status = user.status;
    this.passwordHash = user.passwordHash;
    //this.postsCount = user.postsCount;
    //this.subscribersCount = user.subscribersCount;
  }

   public toPOJO() {
     return {
       id: this.id,
       email: this.email,
       firstname: this.firstname,
       lastname: this.lastname,
       avatar: this.avatar,
       status: this.status,
       passwordHash: this.passwordHash,
      // postsCount: this.postsCount,
      // subscribersCount: this.subscribersCount,
     };
   }


  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

 }
