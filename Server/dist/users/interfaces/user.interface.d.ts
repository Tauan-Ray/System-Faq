import { Roles } from '@prisma/client';
export interface User {
    name: string;
    email: string;
    password?: string;
    role?: Roles;
}
