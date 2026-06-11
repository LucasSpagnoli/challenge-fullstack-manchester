import { Injectable } from '@nestjs/common';
import { News } from "src/types/news";
import "dotenv/config";
import { CacheService } from 'src/services/cache.service';
import { InfoMoneyService } from 'src/services/infomoney.service';
import { AiService } from 'src/services/ai.service';
import { PreferencesService } from 'src/preferences/preferences.service';

@Injectable()
export class FeedService {
    constructor(
        private cacheService: CacheService,
        private infoMoneyService: InfoMoneyService,
        private aiService: AiService,
        private preferenceService: PreferencesService
    ) { }

    private readonly oneDay = 24 * 60 * 60 * 1000;

    async refreshFeed(id: number): Promise<{ generatedAt: Date, interests: string[], items: News[] }> {
        const generatedAt = new Date(Date.now())
        const filteredNews = await this.aiFilter(id)
        const preferences = await this.preferenceService.getPreferencesById(id)
        return { generatedAt, interests: preferences, items: filteredNews }
    }

    async getFeed(id: number): Promise<{ generatedAt: Date, interests: string[], items: News[] }> {
        const cache = await this.cacheService.getCache(id)
        let filteredNews: News[]
        let generatedAt: Date

        if (cache) {
            generatedAt = cache.generatedAt
            filteredNews = JSON.parse(JSON.stringify(cache.content_json))
        } else {
            generatedAt = new Date(Date.now())
            filteredNews = await this.aiFilter(id)
        }

        const preferences = await this.preferenceService.getPreferencesById(id)
        return { generatedAt, interests: preferences, items: filteredNews }
    }

    async aiFilter(id: number): Promise<News[]> {
        const news = await this.infoMoneyService.getParsedNews()
        const preferences = await this.preferenceService.getPreferencesById(id)
        const filteredNews = await this.aiService.geminiService({ news, preferences })
        await this.cacheService.updateCache(id, filteredNews)
        return filteredNews
    }
}
