import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { XMLParser } from 'fast-xml-parser'
import { summaryFormatter } from "./utils/summaryFormatter";
import { news } from "src/types/news";

@Injectable()
export class InfoMoneyService {
    constructor(private readonly httpService: HttpService) { }

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
}