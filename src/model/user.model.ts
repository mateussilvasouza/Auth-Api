export enum RoleType {
  ADMIN = 'admin',
  STUDANT = 'studant',
}

export interface User{
  id: string;
  name: string;
  email: string;
  password: string;
  role: RoleType;
}

export const users: User[] = []