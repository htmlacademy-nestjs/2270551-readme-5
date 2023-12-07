export interface User {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  postsCount?:number;
  subscribersCount?:number;
}
