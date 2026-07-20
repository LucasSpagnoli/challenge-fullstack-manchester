import { Controller, Get, Req, Query, UseGuards, ParseIntPipe, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { FeedService } from './feed.service';
import { InfoMoneyService } from 'src/services/infomoney.service';
import { ClientsService } from 'src/clients/clients.service';
import type { RequestWithUser } from 'src/types/request-with-user';

@Controller('feed')
export class FeedController {
    constructor(
        private feedService: FeedService,
        private infoMoneyService: InfoMoneyService,
        private clientsService: ClientsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getFeed(
        @Query('target_id', ParseIntPipe) target_id: number,
        @Query('role') role: 'user' | 'client',
        @Req() req: RequestWithUser
    ) {
        if (role === 'client') {
            await this.clientsService.findOne(target_id, req.user.id);
        } else if (target_id !== req.user.id) {
            throw new ForbiddenException("Acesso denegado.");
        }

        return this.feedService.getFeed(target_id, role);
    }

    @UseGuards(JwtAuthGuard)
    @Get('refresh')
    async refreshFeed(
        @Query('target_id', ParseIntPipe) target_id: number,
        @Query('role') role: 'user' | 'client',
        @Req() req: RequestWithUser
    ) {
        if (role === 'client') {
            await this.clientsService.findOne(target_id, req.user.id);
        } else if (target_id !== req.user.id) {
            throw new ForbiddenException("Acesso denegado.");
        }

        return this.feedService.refreshFeed(target_id, role);
    }

    @Get('news')
    async getNews() {
        return this.infoMoneyService.getParsedNews();
    }
}