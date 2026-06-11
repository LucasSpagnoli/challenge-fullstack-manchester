import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/client"
import { DatabaseService } from "src/database/database.service"
import { News } from "src/types/news"

@Injectable()
export class CacheService {
    constructor(
        private databaseService: DatabaseService,
    ) { }

    private readonly oneDay = 24 * 60 * 60 * 1000;

    async createCache(id: number) {
        return await this.databaseService.cache.create({ data: { user_id: id, content_json: [] } })
    }

    async updateCache(userId: number, news: News[]) {
        const content_json = news
        const cacheAlreadyExists = await this.databaseService.cache.findUnique({ where: { user_id: userId } })
        const generatedAt = new Date()
        if (cacheAlreadyExists) {
            return await this.databaseService.cache.update({ where: { user_id: userId }, data: { content_json, generatedAt } })
        } else {
            return await this.createCache(userId)
        }
    }

    async getCache(id: number): Promise<{ user_id: number, content_json: JsonValue, generatedAt: Date } | null> {
        let cache = await this.databaseService.cache.findUnique({ where: { user_id: id } })
        if (!cache) {
            await this.createCache(id)
            return null
        }

        if (Date.now() - cache.generatedAt.getTime() > this.oneDay) {
            return null
        }

        return cache
    }
}