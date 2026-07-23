export type PreferencesResponse = string[];

export interface UsePreferencesResult {
    prefs: string[];
    loading: boolean;
    saving: boolean;
    removingTopic: string | null;
    error: string | null;
    addPref: (topic: string) => void;
    removePref: (topic: string) => void;
    save: () => Promise<void>;
}