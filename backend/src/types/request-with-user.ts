import { Request } from 'express';

export type Role = 'client' | 'user';

export interface RequestWithUser extends Request {
    user: {
        id: number;
        name: string;
        email: string
    };
}