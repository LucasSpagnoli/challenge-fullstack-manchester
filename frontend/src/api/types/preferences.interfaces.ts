export interface PreferencesResponse {
    topic: string[];
}
 
export interface UpdatePreferencesPayload {
    user_id: number;
    topic: string[];
}
 