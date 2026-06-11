import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AiChat } from "src/types/ai-chat";
import { firstValueFrom } from "rxjs";
import "dotenv/config";
import { prompt } from 'src/Prompt';

@Injectable()
export class AiService {

    constructor(
        private httpService: HttpService,
    ) { }

    private readonly model = 'gemini-2.5-flash';
    private readonly apiKey = process.env.API_KEY

    async geminiService({ news, preferences }: AiChat) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`

        const body = {
            contents: [{ parts: [{ text: `[INSTRUÇÕES] ${prompt} [INTERESSES] ${JSON.stringify(preferences)} [NOTÍCIAS] ${JSON.stringify(news)}` }] }]
        }

        try {
            const { data } = await firstValueFrom(this.httpService.post(url, body, {
                headers: { 'Content-Type': 'application/json' }
            }))

            const raw = data.candidates[0].content.parts[0].text
            const clean = raw.trim().replace(/^```json|```$/g, '').trim()
            return JSON.parse(clean)

        } catch (error: any) {
            const mensagem = error.response?.data?.error?.message ?? error.message;
            const status = error.response?.status;

            console.error(`Status: ${status} | Mensagem: ${mensagem}`);

            throw new InternalServerErrorException(`Erro na API do Gemini: ${mensagem}`);
        }
    }
}