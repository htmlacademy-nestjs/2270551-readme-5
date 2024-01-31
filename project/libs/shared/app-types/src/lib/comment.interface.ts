export interface Comment {
  blogId?: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  postId?: string;
  message: string;
  userId: string;
}
