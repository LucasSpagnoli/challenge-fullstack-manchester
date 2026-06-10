import { Injectable } from "@nestjs/common";
import { AiChatDTO } from "src/types/DTO/ai-chat.dto";
import { AiUseCase } from "./lib/AiUseCase";

@Injectable()
export class GeminiService {

    private readonly url = ''

    // tipar news
    async aiFilter({ message, system }: AiChatDTO) {
        const data = await AiUseCase({ url: this.url, message })
        return data.content[0].text
    }
}