import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios'
import { InfoMoneyService } from './info-money.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [FeedController],
  providers: [FeedService, InfoMoneyService]
})
export class FeedModule {

}
