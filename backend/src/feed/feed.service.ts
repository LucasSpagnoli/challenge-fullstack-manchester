import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AiChatDTO } from "src/types/ai-chat.dto";
import { firstValueFrom } from "rxjs";
import { XMLParser } from 'fast-xml-parser'
import { summaryFormatter } from "./utils/summaryFormatter";
import { news } from "src/types/news";

@Injectable()
export class FeedService {
    constructor(
        private databaseService: DatabaseService,
        private readonly httpService: HttpService
    ) { }

    private readonly model = 'gemini-2.5-flash';
    private readonly apiKey = process.env.API_KEY
    private readonly prompt = process.env.PROMPT

    async geminiCall({ news, preferences }: AiChatDTO) {

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`
        const body = {
            contents: [
                {
                    parts: [{ text: `[PROMPT] ${this.prompt} | [INTERESSES] ${preferences} | [NOTÍCIAS] ${news}` }]
                }
            ]
        }

        try {
            const { data } = await firstValueFrom(this.httpService.post(url, body, {
                headers: { 'Content-Type': 'application/json' }
            }))
            return data.candidates[0].content.parts[0].text
        } catch (error) {
            const mensagem = error.response?.data?.error?.message ?? error.message;
            const status = error.response?.status;
            console.error(`Status: ${status} | Mensagem: ${mensagem}`);
            throw new InternalServerErrorException(`Erro na API do Gemini: ${mensagem}`);
        }
    }

    async aiFilter({ news, preferences }: AiChatDTO) {
        const result = await this.geminiCall({ news, preferences })
        return result
    }

    async geminiTest(text: string) {

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`
        const body = {
            contents: [
                {
                    parts: [{ text: `[PROMPT] ${this.prompt} | [MENSAGEM] ${text}` }]
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
}
