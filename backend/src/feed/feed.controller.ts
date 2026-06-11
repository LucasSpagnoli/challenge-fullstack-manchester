import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { FeedService } from './feed.service';
import { InfoMoneyService } from 'src/services/infomoney.service';

@Controller('feed')
@UseGuards(JwtAuthGuard)
export class FeedController {

    constructor(
        private feedService: FeedService,
        private infoMoneyService: InfoMoneyService
    ) { }

    @Get()
    async getFeed(@Req() req: Request) {
        if (!req.user) {
            throw new BadRequestException("Usuário ausente")
        }
        const userId = req.user.id
        if (!userId) {
            throw new BadRequestException("ID de usuário ausente")
        }
        
        return this.feedService.getFeed(userId)
    }

    @Get('refresh')
    async refreshFeed(@Req() req: Request) {
        if (!req.user) {
            throw new BadRequestException("Usuário ausente")
        }
        const userId = req.user.id
        if (!userId) {
            throw new BadRequestException("ID de usuário ausente")
        }
        
        return this.feedService.refreshFeed(userId)
    }

    @Get('news')
    async getNews(){
        return this.infoMoneyService.getParsedNews()
    }
}