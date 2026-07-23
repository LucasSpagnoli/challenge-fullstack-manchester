import { BadRequestException, Controller, Get, Param, ParseIntPipe, Req, UseGuards, ForbiddenException, } from '@nestjs/common';
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
        try {
            return await this.feedService.getFeed(req.user.id, 'user');
        } catch (err) {
            throw new BadRequestException('Erro ao buscar feed do usuário');
        }
    }

    @Get('refresh')
    async refreshUserFeed(@Req() req: RequestWithUser) {
        try {
            return await this.feedService.refreshFeed(req.user.id, 'user');
        } catch (err) {
            throw new BadRequestException('Erro ao atualizar feed do usuário');
        }
    }

    @Get('news')
    async getNews() {
        return this.infoMoneyService.getParsedNews();
    }

    @Get('refresh/:client_id')
    async refreshClientFeed(@Req() req: RequestWithUser, @Param('client_id', ParseIntPipe) client_id: number,) {
        try {
            await this.clientsService.findOne(client_id, req.user.id);
            return await this.feedService.refreshFeed(client_id, 'client');
        } catch (err) {
            throw new ForbiddenException('Acesso a este cliente negado');
        }
    }

    @Get(':client_id')
    async getClientFeed(@Req() req: RequestWithUser, @Param('client_id', ParseIntPipe) client_id: number) {
        try {
            await this.clientsService.findOne(client_id, req.user.id);
            return await this.feedService.getFeed(client_id, 'client');
        } catch (err) {
            throw new ForbiddenException('Acesso a este cliente negado');
        }
    }
}