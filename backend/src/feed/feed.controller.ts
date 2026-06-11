import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { FeedService } from './feed.service';

@Controller('feed')
// @UseGuards(JwtAuthGuard)
export class FeedController {

    constructor(
        private feedService: FeedService,
    ) { }

    @Get('/infomoney')
    async getNews() {
        return this.feedService.getParsedNews()
    }

    @Get(':id')
    async getFeed(@Param('id', ParseIntPipe) userId: number) {
        // async getFeed(@Req() req: Request) {
        // const userId = req.user?.id
        if (!userId) {
            throw new BadRequestException("ID de usuário ausente")
        }
        const news = await this.feedService.getParsedNews()
        const preferences = await this.feedService.getPreferences(userId)
        return this.feedService.geminiCall({ news, preferences })
    }

    @Post()
    async geminiTest(@Body(ValidationPipe) { text }: { text: string }) {
        return this.feedService.geminiTest(text)
    }


}