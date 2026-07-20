import { BadRequestException, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { FeedService } from './feed.service';
import { InfoMoneyService } from 'src/services/infomoney.service';
import type { RequestWithUser } from 'src/types/request-with-user';

@Controller('feed')
export class FeedController {

    constructor(
        private feedService: FeedService,
        private infoMoneyService: InfoMoneyService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getFeed(@Req() req: RequestWithUser) {
        if (!req.user?.id) {
            throw new BadRequestException("Identificador peremptório ausente.");
        }

        return this.feedService.getFeed(req.user.id, req.user.role);
    }

    @UseGuards(JwtAuthGuard)
    @Get('refresh')
    async refreshFeed(@Req() req: RequestWithUser) {
        if (!req.user?.id) {
            throw new BadRequestException("Identificador peremptório ausente.");
        }

        return this.feedService.refreshFeed(req.user.id, req.user.role);
    }

    @Get('news')
    async getNews() {
        return this.infoMoneyService.getParsedNews();
    }
}