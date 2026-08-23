export interface UserRecord {
    id: number;
    name: string;
    email: string;
    role: string;
    preferences: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
    preferences: string[];
}
