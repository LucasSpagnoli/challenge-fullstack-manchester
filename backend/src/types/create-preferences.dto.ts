import { Role } from "./role";

export interface PreferencesPayload {
    owner_id: number;
    topic: string[];
    role: Role;
}
