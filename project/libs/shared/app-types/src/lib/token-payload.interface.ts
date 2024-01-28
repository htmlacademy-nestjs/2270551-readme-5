import { UserStatus } from './user-status.enum';

 export interface TokenPayload {
   sub: string;
   email: string;
   staus: UserStatus;
   lastname: string;
   firstname: string;
 }
