import { Document } from 'mongoose';
 import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
 import { AuthUser, UserStatus } from '@project/libs/shared/app-types';;

 @Schema({
   collection: 'accounts',
   timestamps: true,
 })
 export class BlogUserModel extends Document implements AuthUser {
   @Prop()
   public avatar: string;

   @Prop({
     required: true,
     unique: true,
   })
   public email: string;

   @Prop({
     required: true,
   })
   public firstname: string;

   @Prop({
     required: true,
   })
   public lastname: string;

   @Prop({
     required: true,
   })
   public passwordHash: string;

   @Prop({
     required: true,
     type: String,
     enum: UserStatus,
     default: UserStatus.User,
   })
   public status: UserStatus;
 }

 export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
