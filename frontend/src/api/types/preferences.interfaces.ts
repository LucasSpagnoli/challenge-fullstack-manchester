export type PreferencesResponse = string[];

export interface UpdatePreferencesPayload {
    user_id: number;
    topic: string[];
}

export interface UsePreferencesResult {
    prefs: string[];
    loading: boolean;
    saving: boolean;
    removingTopic: string | null;
    error: string | null;
    addPref: (topic: string) => void;
    removePref: (topic: string) => Promise<void>;
    save: () => Promise<void>;
}