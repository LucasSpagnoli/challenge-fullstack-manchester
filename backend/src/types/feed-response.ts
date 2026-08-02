import { News } from "./news";

export interface FeedResponse {
    generatedAt: Date;
    interests: string[];
    items: News[];
}