import { UserStatus } from './user-status.enum';

 export interface TokenPayload {
   sub: string;
   email: string;
   status: UserStatus;
   lastname: string;
   firstname: string;
 }
