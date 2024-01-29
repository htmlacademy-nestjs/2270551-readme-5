import {User} from './user.interface';
export interface AuthUser extends User {
  name: string;
  cteatedAt: Date;
  passwordHash: string;
}
