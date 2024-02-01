import {User} from './user.interface';
export interface AuthUser extends User {
  name?: string;
  lastname: string;
  firstname: string;
  createdAt: Date;
  passwordHash: string;
}
