export interface FeedItem {
    title: string;
    source: string;
    url: string;
    summary: string;
    // imageUrl?: string; // TODO: adicionar quando o backend passar a retornar imagem
}

export interface FeedResponse {
    generatedAt: string;
    interests: string[];
    items: FeedItem[];
}

export interface SummaryResponse {
    summary: string
}

export interface UseFeedResult {
    feed: FeedResponse | null;
    loading: boolean;
    refreshing: boolean;
    error: string | null;
    summaryLoading: boolean;
    refresh: () => Promise<void>;
    getSummary: () => Promise<SummaryResponse>
}