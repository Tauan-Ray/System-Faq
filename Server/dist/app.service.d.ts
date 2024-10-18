import { PrismaService } from './database/prisma.service';
export declare class AppService {
    private prisma;
    constructor(prisma: PrismaService);
    getFaq(): Promise<any[]>;
}
