import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { FeedService } from './feed.service';
import { InfoMoneyService } from './info-money.service';

@Controller('feed')
// @UseGuards(JwtAuthGuard)
export class FeedController {

    constructor(
        private feedService: FeedService,
        private infoMoneyService: InfoMoneyService,
    ) { }

    @Get()
    getFeed(@Req() req: Request) {
        const userId = req.user?.id
        return this.feedService
    }

}
