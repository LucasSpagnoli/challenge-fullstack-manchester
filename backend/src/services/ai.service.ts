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
    private readonly apiKey = process.env.GEMINI_API_KEY;

    async geminiService({ news, preferences }: AiChat) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

        const numberedTitles = news.map((n, i) => `${i + 1}. ${n.title}`).join('\n');

        const body = {
            contents: [{ parts: [{ text: `[INSTRUÇÕES] ${prompt} [INTERESSES] ${JSON.stringify(preferences)} [NOTÍCIAS] ${numberedTitles}` }] }]
        };

        try {
            const data = await this.postWithRetry(url, body);

            const raw: string = data.candidates[0].content.parts[0].text.trim();

            console.log(raw);
            if (raw === '-1') return [];

            const indices = raw.split(' ').map(n => parseInt(n) - 1);
            return indices.map(i => news[i]);
        } catch (error: any) {
            const mensagem = error.response?.data?.error?.message ?? error.message;
            const status = error.response?.status;

            console.error(`Status: ${status} | Mensagem: ${mensagem}`);

            throw new InternalServerErrorException(`Erro na API do Gemini: ${mensagem}`);
        }
    }

    private async postWithRetry(url: string, body: any, retries = 3) {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const { data } = await firstValueFrom(
                    this.httpService.post(url, body, {
                        headers: { 'Content-Type': 'application/json' }
                    })
                );

                return data;
            } catch (error: any) {
                const status = error.response?.status;
                const isRateLimit = status === 429;

                if (!isRateLimit || attempt === retries) {
                    throw error;
                }

                const delay = Math.pow(2, attempt) * 1000;

                console.warn(
                    `Rate limit atingido. Tentativa ${attempt + 1}/${retries}. Aguardando ${delay}ms`
                );

                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
}