import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { AiChat } from "src/types/ai-chat";
import { firstValueFrom } from "rxjs";
import "dotenv/config";
import { prompt } from 'src/utils/Prompt';

@Injectable()
export class AiService {
    private readonly logger = new Logger(AiService.name);
    private readonly model = 'gemini-2.5-flash';
    private readonly apiKey = process.env.GEMINI_API_KEY;

    constructor(
        private httpService: HttpService,
    ) { }

    async geminiService({ news, preferences }: AiChat) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
        const numberedTitles = news.map((n, i) => `${i + 1}. ${n.title}`).join('\n');

        const body = {
            contents: [{ parts: [{ text: `[INSTRUÇÕES] ${prompt} [INTERESSES] ${JSON.stringify(preferences)} [NOTÍCIAS] ${numberedTitles}` }] }]
        };

        try {
            const data = await this.postWithRetry(url, body);
            const raw: string = data.candidates[0].content.parts[0].text.trim();

            this.logger.debug(`Resposta bruta do LLM: ${raw}`);
            if (raw === '-1') return [];

            const indices = raw.split(' ').map(n => parseInt(n) - 1);
            return indices.map(i => news[i]);
        } catch (error: any) {
            const mensagem = error.response?.data?.error?.message ?? error.message;
            const status = error.response?.status;

            this.logger.error(`Status: ${status} \n Falha na integração com Gemini: ${mensagem}\n`, error.stack);
            throw new InternalServerErrorException(`Inviável processar dados via IA no momento.`);
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
                this.logger.warn(`Limitação de taxa (Rate Limit) atingida. Tentativa ${attempt + 1}/${retries}. Retardando execução em ${delay}ms`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
}