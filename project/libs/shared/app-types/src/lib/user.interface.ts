import { UserStatus } from "./user-status.enum";

export interface User {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  status: UserStatus;
  postsCount?:number;
  subscribersCount?:number;
}
