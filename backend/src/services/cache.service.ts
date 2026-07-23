import { BadRequestException, Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/client"
import { DatabaseService } from "src/database/database.service"
import { News } from "src/types/news"
import { Role } from "src/types/role";

@Injectable()
export class CacheService {
    constructor(
        private databaseService: DatabaseService,
    ) { }

    private readonly oneDay = 24 * 60 * 60 * 1000;

    async createCache(owner_id: number, role: Role) {
        const data = { owner_id, content_json: [] };

        return role === "user"
            ? await this.databaseService.user_cache.create({ data })
            : await this.databaseService.client_cache.create({ data });
    }

    async updateCache(owner_id: number, news: News[], role: Role) {
        const content_json = news
        const generatedAt = new Date()
        const where = { owner_id };
        const data = { content_json, generatedAt };
        const cacheExists = role === "user"
            ? await this.databaseService.user_cache.findUnique({ where })
            : await this.databaseService.client_cache.findUnique({ where });

        if (cacheExists) {
            return role === "user"
                ? await this.databaseService.user_cache.update({ where, data })
                : await this.databaseService.client_cache.update({ where, data });
        }

        return await this.createCache(owner_id, role);
    }

    async getCache(owner_id: number, role: Role): Promise<{ owner_id: number, content_json: JsonValue, generatedAt: Date } | null> {
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

        return cache;
    }
}