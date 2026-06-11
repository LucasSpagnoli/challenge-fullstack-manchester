import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AiChat } from "src/types/ai-chat";
import { firstValueFrom, generate } from "rxjs";
import { XMLParser } from 'fast-xml-parser'
import { summaryFormatter } from "./utils/summaryFormatter";
import { news } from "src/types/news";
import "dotenv/config";
import { prompt } from 'src/Prompt';
import { JsonObject, JsonValue } from '@prisma/client/runtime/client';

@Injectable()
export class FeedService {
    constructor(
        private databaseService: DatabaseService,
        private httpService: HttpService,
    ) { }

    private readonly model = 'gemini-2.5-flash';
    private readonly apiKey = process.env.API_KEY
    private readonly oneDay = 24 * 60 * 60 * 1000;

    async getFeed({ news, preferences }: AiChat, id: number) {

        let cache = await this.getCache(id)
        let filteredNews: news[]

        if (!cache) {
            filteredNews = await this.aiFilter({ news, preferences }, id)
            cache = await this.createCache(id, filteredNews)
        } else if (Date.now() - cache.generatedAt.getTime() > this.oneDay) {
            filteredNews = await this.aiFilter({ news, preferences }, id)
        } else {
            filteredNews = JSON.parse(JSON.stringify(cache.content_json))
        }

        return { generatedAt: cache.generatedAt, interests: preferences, items: filteredNews }
    }

    async aiFilter({ news, preferences }: AiChat, id: number): Promise<news[]> {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`
        const body = {
            contents: [
                {
                    parts: [{ text: `[INSTRUÇÕES] ${prompt} [INTERESSES] ${JSON.stringify(preferences)} [NOTÍCIAS] ${JSON.stringify(news)}` }]
                }
            ]
        }

        try {
            const { data } = await firstValueFrom(this.httpService.post(url, body, {
                headers: { 'Content-Type': 'application/json' }
            }))
            const filteredNews = data.candidates[0].content.parts[0].text
            await this.saveCache(id, news)
            return filteredNews
        } catch (error: any) {
            const mensagem = error.response?.data?.error?.message ?? error.message;
            const status = error.response?.status;
            console.error(`Status: ${status} | Mensagem: ${mensagem}`);
            throw new InternalServerErrorException(`Erro na API do Gemini: ${mensagem}`);
        }
    }

    async createCache(id: number, news: news[]) {
        const content_json = JSON.stringify(news)
        return await this.databaseService.cache.create({ data: { user_id: id, content_json } })
    }

    async saveCache(id: number, news: news[]) {
        const content_json = JSON.stringify(news)
        const cacheAlreadyExists = await this.databaseService.cache.findUnique({ where: { user_id: id } })
        const generatedAt = new Date()
        if (cacheAlreadyExists) {
            return await this.databaseService.cache.update({ where: { user_id: id }, data: { content_json, generatedAt } })
        } else {
            return await this.createCache(id, news)
        }
    }

    async getCache(id: number): Promise<{ user_id: number, content_json: JsonValue, generatedAt: Date } | null> {
        const cache = await this.databaseService.cache.findUnique({ where: { user_id: id } })
        return cache || null
    }

    async getRSSNews(): Promise<string> {
        const url = 'https://www.infomoney.com.br/feed/'
        const { data } = await firstValueFrom(this.httpService.get<string>(url))
        return data
    }

    async getParsedNews(): Promise<news[]> {
        const xmlNews = await this.getRSSNews()
        const parser = new XMLParser()
        const json = parser.parse(xmlNews)

        // navega pelo RSS do InfoMoney (rss -> channel -> item)
        const items = json.rss.channel.item

        return items.map(item => ({
            title: item.title,
            source: 'InfoMoney',
            url: item.link,
            summary: summaryFormatter(item.description)
        }))
    }

    async getPreferences(userId: number) {
        const preferences = await this.databaseService.preferences.findUnique({ where: { user_id: userId } })
        if (!preferences) {
            throw new Error("ID não atrelado a nenhum usuário ou interesse")
        }
        const userPreferences = preferences.topic
        if (!userPreferences) {
            throw new BadRequestException("Usuário sem interesses registrados")
        }
        return userPreferences
    }

    async geminiTest(text: string) {

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`
        const body = {
            contents: [
                {
                    parts: [{ text: `[PROMPT] ${prompt} | [MENSAGEM] ${text}` }]
                }
            ]
        }

        try {
            const { data } = await firstValueFrom(this.httpService.post(url, body, {
                headers: { 'Content-Type': 'application/json' }
            }))
            return data.candidates[0].content.parts[0].text
        } catch (error: any) {
            const mensagem = error.response?.data?.error?.message ?? error.message;
            const status = error.response?.status;
            console.error(`Status: ${status} | Mensagem: ${mensagem}`);
            throw new InternalServerErrorException(`Erro na API do Gemini: ${mensagem}`);
        }
    }
}
