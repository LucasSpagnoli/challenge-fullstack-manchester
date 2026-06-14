export type PreferencesResponse = string[];

export interface UpdatePreferencesPayload {
    user_id: number;
    topic: string[];
}