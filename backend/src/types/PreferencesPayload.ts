import { Role } from "./role";

export interface PreferencesPayload {
    id: number;
    preferences: string[];
    role: Role;
}

