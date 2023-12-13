import { AuthUser,UserStatus } from '@project/libs/shared/app-types';
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
   public postsCount?:number;
   public subscribersCount?:number;

   constructor(user: AuthUser) {
     this.populate(user)
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
       postsCount: this.postsCount,
       subscribersCount: this.subscribersCount,
     };
   }

   public populate(data: AuthUser): void {
     this.email = data.email;
     this.firstname = data.firstname;
     this.lastname = data.lastname;
     this.avatar = data.avatar;
     this.status = data.status;
     this.passwordHash = data.passwordHash;
     this.postsCount = data.postsCount;
     this.subscribersCount = data.subscribersCount;


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
