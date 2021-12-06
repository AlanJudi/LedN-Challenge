export interface BaseAccount {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  dob: Date;
  mfa?: string;
  createdAt: Date;
  updatedAt: Date;
  referredBy?: string;
}

export interface IUser extends BaseAccount {
  password: string;
  username: string;
  isAdmin: Boolean;
}

export interface IPartialUser extends Partial<IUser> {}
