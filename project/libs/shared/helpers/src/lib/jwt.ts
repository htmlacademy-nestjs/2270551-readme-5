import { BlogStatus, TokenPayload, User, UserStatus } from '@project/libs/shared/app-types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    lastname: user.lastname,
    firstname: user.firstname,
    status: user.status
  };
}
