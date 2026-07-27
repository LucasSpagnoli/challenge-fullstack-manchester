import { firstValueFrom } from "rxjs";
import { XMLParser } from 'fast-xml-parser';
import { summaryFormatter } from '../utils/summaryFormatter';
import { News } from "src/types/news";
import "dotenv/config";
import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";

@Injectable()
export class InfoMoneyService {
    private readonly logger = new Logger(InfoMoneyService.name);

    constructor(
        private httpService: HttpService,
    ) { }

    async getRSSNews(): Promise<string> {
        const url = 'https://www.infomoney.com.br/feed/';
        try {
            const { data } = await firstValueFrom(this.httpService.get<string>(url));
            return data;
        } catch (error) {
            const err = error as Error;
            this.logger.error(`Falha ao interceptar feed RSS do InfoMoney: ${err.message}\n`, err.stack);
            throw new InternalServerErrorException("Serviço de notícias indisponível no momento.");
        }
    }

    async getParsedNews(): Promise<News[]> {
        const xmlNews = await this.getRSSNews();

        try {
            const parser = new XMLParser();
            const json = parser.parse(xmlNews);

            // navega pelo RSS do InfoMoney (rss -> channel -> item)
            const items = json.rss.channel.item;

            return items.map((item: any) => ({
                title: item.title,
                source: 'InfoMoney',
                url: item.link,
                summary: summaryFormatter(item.description)
            }));
        } catch (error) {
            const err = error as Error;
            this.logger.error(`Erro ao analisar (parse) o XML das notícias: ${err.message}\n`, err.stack);
            throw new InternalServerErrorException("Inviável processar as notícias recebidas.");
        }
    }
}