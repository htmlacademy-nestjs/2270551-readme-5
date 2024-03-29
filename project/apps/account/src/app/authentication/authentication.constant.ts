export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';
export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid';
export const AUTH_USER_DATE_BIRTH_NOT_VALID = 'The user date birth is not valid';
export const UserPasswordLength = {
  Min: 6,
  Max: 12,
};
export const UserNameLength = {
  Min: 3,
  Max: 50,
};
export const AuthPath = {
  Main:'auth',
  Register:'register',
  Login:'login',
  Id: ':id'
} as const;

