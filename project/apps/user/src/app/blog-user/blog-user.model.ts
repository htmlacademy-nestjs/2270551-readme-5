import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser, UserStatus } from '@project/libs/shared/app-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class BlogUserModel extends Document implements AuthUser {
  createdAt: Date;
  firstname: string;
  lastname: string;
  avatar?: string;
  status: UserStatus;
  postsCount?: number;
  subscribersCount?: number;
  @Prop({
    type: String,
    default: null
  })
  public avatarId: string;

  @Prop({
    required: true,
    unique: true,
    type: String
  })
  public email: string;

  @Prop({
    required: true,
    type: String
  })
  public name: string;

  @Prop({
    required: true,
    type: String
  })
  public passwordHash: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
