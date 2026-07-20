import { Injectable } from '@nestjs/common';
import { News } from "src/types/news";
import "dotenv/config";
import { CacheService } from 'src/services/cache.service';
import { InfoMoneyService } from 'src/services/infomoney.service';
import { AiService } from 'src/services/ai.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { Role } from 'src/types/request-with-user';

@Injectable()
export class FeedService {
    constructor(
        private cacheService: CacheService,
        private infoMoneyService: InfoMoneyService,
        private aiService: AiService,
        private preferenceService: PreferencesService
    ) { }

    async refreshFeed(id: number, role: Role): Promise<{ generatedAt: Date, interests: string[], items: News[] }> {
        const generatedAt = new Date();
        const filteredNews = await this.aiFilter(id, role);
        const preferences = await this.preferenceService.getPreferencesById(id, role);

        return { generatedAt, interests: preferences, items: filteredNews };
    }

    async getFeed(id: number, role: Role): Promise<{ generatedAt: Date, interests: string[], items: News[] }> {
        const cache = await this.cacheService.getCache(id, role);
        let filteredNews: News[];
        let generatedAt: Date;

        if (cache) {
            generatedAt = cache.generatedAt;
            filteredNews = JSON.parse(JSON.stringify(cache.content_json));
        } else {
            generatedAt = new Date();
            filteredNews = await this.aiFilter(id, role);
        }

        const preferences = await this.preferenceService.getPreferencesById(id, role);
        return { generatedAt, interests: preferences, items: filteredNews };
    }

    async aiFilter(id: number, role: Role): Promise<News[]> {
        const news = await this.infoMoneyService.getParsedNews();
        const preferences = await this.preferenceService.getPreferencesById(id, role);

        const filteredNews = await this.aiService.geminiService({ news, preferences });
        await this.cacheService.updateCache(id, filteredNews, role);

        return filteredNews;
    }
}