import { Request } from 'express';
import { AuthRole, FeedRole } from './role';

export type { FeedRole };

export interface RequestWithUser extends Request {
    user: {
        id: number;
        name: string;
        email: string;
        role: AuthRole;
    };
}