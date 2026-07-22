export type PreferencesResponse = string[];

export interface UpdatePreferencesPayload {
    owner_id: number;
    topic: string[];
    role: 'client' | 'user'
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