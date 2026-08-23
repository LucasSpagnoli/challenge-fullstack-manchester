import { AuthRole } from './role';

declare global {
    namespace Express {
        interface User {
            id: number;
            name: string;
            email: string;
            role: AuthRole;
        }
    }
}

export {}