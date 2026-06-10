import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AiChatDTO } from "src/types/ai-chat.dto";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class GeminiService {

    constructor(private readonly httpService: HttpService) { }

    private readonly model = 'gemini-2.0-flash';
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
            throw new InternalServerErrorException(`Erro na API do Gemini: ${error}`)
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
        } catch (error) {
            throw new InternalServerErrorException(`Erro na API do Gemini: ${error}`)
        }
    }
}