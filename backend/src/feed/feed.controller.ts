import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { FeedService } from './feed.service';

@Controller('feed')
@UseGuards(JwtAuthGuard)
export class FeedController {

    constructor(
        private feedService: FeedService
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
}