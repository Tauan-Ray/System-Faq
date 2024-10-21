import { Roles } from '@prisma/client';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: Roles;
}
