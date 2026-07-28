import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { FeedService } from './feed.service';
import { InfoMoneyService } from 'src/services/infomoney.service';
import { ClientsService } from 'src/clients/clients.service';
import type { RequestWithUser } from 'src/types/request-with-user';

@UseGuards(JwtAuthGuard)
@Controller('feed')
export class FeedController {
    constructor(
        private readonly feedService: FeedService,
        private readonly infoMoneyService: InfoMoneyService,
        private readonly clientsService: ClientsService,
    ) { }

    @Get()
    async getUserFeed(@Req() req: RequestWithUser) {
        return await this.feedService.getFeed(req.user.id, 'user');
    }

    @Get('refresh')
    async refreshUserFeed(@Req() req: RequestWithUser) {
        return await this.feedService.refreshFeed(req.user.id, 'user');
    }

    @Get('news')
    async getNews() {
        return this.infoMoneyService.getParsedNews();
    }

    @Get('refresh/:client_id')
    async refreshClientFeed(@Req() req: RequestWithUser, @Param('client_id', ParseIntPipe) client_id: number) {
        await this.clientsService.findOne(client_id, req.user.id);
        return await this.feedService.refreshFeed(client_id, 'client');
    }

    @Get(':client_id')
    async getClientFeed(@Req() req: RequestWithUser, @Param('client_id', ParseIntPipe) client_id: number) {
        await this.clientsService.findOne(client_id, req.user.id);
        return await this.feedService.getFeed(client_id, 'client');
    }
}