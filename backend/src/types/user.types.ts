export interface IUserRecord {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreateInput {
  name: string;
  email: string;
  password: string;
}

export interface IUserPublic {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}
