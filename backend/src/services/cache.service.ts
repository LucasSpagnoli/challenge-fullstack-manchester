import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { JsonValue } from "@prisma/client/runtime/client";
import { DatabaseService } from "src/database/database.service";
import { News } from "src/types/news";
import { FeedRole } from "src/types/role";

@Injectable()
export class CacheService {
    private readonly logger = new Logger(CacheService.name);
    private readonly oneDay = 24 * 60 * 60 * 1000;

    constructor(
        private databaseService: DatabaseService,
    ) { }

    async createCache(owner_id: number, role: FeedRole) {
        try {
            return role === "user"
                ? await this.databaseService.user_cache.create({ data: { owner_id, content_json: [] } })
                : await this.databaseService.client_cache.create({ data: { owner_id, content_json: [], summary: '' } });
        } catch (error) {
            const err = error as Error;
            this.logger.error(`Falha ao instanciar cache [Owner: ${owner_id}, Role: ${role}]: ${err.message}`, err.stack);
            throw new InternalServerErrorException("Erro ao persistir o cache inicial.");
        }
    }

    async updateCache(owner_id: number, role: FeedRole, news?: News[], summary?: string | null) {
        try {
            const where = { owner_id };
            const data: any = { generatedAt: new Date() };
            if (news !== undefined) data.content_json = news;
            if (summary !== undefined && role === 'client') data.summary = summary;

            const cacheExists = role === "user"
                ? await this.databaseService.user_cache.findUnique({ where })
                : await this.databaseService.client_cache.findUnique({ where });

            if (cacheExists) {
                return role === "user"
                    ? await this.databaseService.user_cache.update({ where, data })
                    : await this.databaseService.client_cache.update({ where, data });
            }

            return await this.createCache(owner_id, role);
        } catch (error) {
            const err = error as Error;
            this.logger.error(`Anomalia ao atualizar cache [Owner: ${owner_id}, Role: ${role}]: ${err.message}`, err.stack);
            throw new InternalServerErrorException("Inviável atualizar os registros de cache.");
        }
    }

    async getCache(owner_id: number, role: FeedRole): Promise<{ owner_id: number, content_json: JsonValue, summary?: string, generatedAt: Date } | null> {
        try {
            const cache = role === "user"
                ? await this.databaseService.user_cache.findUnique({ where: { owner_id } })
                : await this.databaseService.client_cache.findUnique({ where: { owner_id } });

            if (!cache) {
                await this.createCache(owner_id, role);
                return null;
            }

            if (Date.now() - cache.generatedAt.getTime() > this.oneDay) {
                return null;
            }

            console.log('cache')
            return cache;
        } catch (error) {
            const err = error as Error;
            this.logger.error(`Falha ao recuperar cache [Owner: ${owner_id}, Role: ${role}]: ${err.message}`, err.stack);
            throw new InternalServerErrorException("Erro ao consultar a camada de cache.");
        }
    }
}