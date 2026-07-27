import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { News } from "src/types/news";
import "dotenv/config";
import { CacheService } from 'src/services/cache.service';
import { InfoMoneyService } from 'src/services/infomoney.service';
import { AiService } from 'src/services/ai.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { Role } from 'src/types/request-with-user';

@Injectable()
export class FeedService {
    private readonly logger = new Logger(FeedService.name);

    constructor(
        private cacheService: CacheService,
        private infoMoneyService: InfoMoneyService,
        private aiService: AiService,
        private preferenceService: PreferencesService
    ) { }

    async refreshFeed(id: number, role: Role): Promise<{ generatedAt: Date, interests: string[], items: News[] }> {
        try {
            const generatedAt = new Date();
            const filteredNews = await this.aiFilter(id, role);
            const preferences = await this.preferenceService.getPreferencesById(id, role);

            return { generatedAt, interests: preferences, items: filteredNews };
        } catch (error) {
            const err = error as Error;
            this.logger.error(`Infortúnio ao reciclar feed [ID: ${id}, Role: ${role}]: ${err.message}`, err.stack);
            throw new InternalServerErrorException("Não foi possível atualizar o feed no momento.");
        }
    }

    async getFeed(id: number, role: Role): Promise<{ generatedAt: Date, interests: string[], items: News[] }> {
        try {
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
        } catch (error) {
            const err = error as Error;
            this.logger.error(`Falha ao resgatar feed [ID: ${id}, Role: ${role}]: ${err.message}`, err.stack);
            throw new InternalServerErrorException("Inviável carregar o feed de notícias.");
        }
    }

    async aiFilter(id: number, role: Role): Promise<News[]> {
        try {
            const news = await this.infoMoneyService.getParsedNews();
            const preferences = await this.preferenceService.getPreferencesById(id, role);

            const filteredNews = await this.aiService.geminiService({ news, preferences });
            await this.cacheService.updateCache(id, filteredNews, role);

            return filteredNews;
        } catch (error) {
            const err = error as Error;
            this.logger.error(`Anomalia no processamento heurístico da IA [ID: ${id}, Role: ${role}]: ${err.message}`, err.stack);
            throw new InternalServerErrorException("Falha ao filtrar notícias mediante Inteligência Artificial.");
        }
    }
}