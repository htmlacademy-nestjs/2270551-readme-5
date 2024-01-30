import { UserStatus } from "./user-status.enum";

export interface User {
  name?: any;
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  status: UserStatus;
  postsCount?:number;
  subscribersCount?:number;
}
