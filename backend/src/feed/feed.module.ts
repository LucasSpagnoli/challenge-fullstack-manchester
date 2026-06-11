import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios'
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, HttpModule, AuthModule],
  controllers: [FeedController],
  providers: [FeedService]
})
export class FeedModule {

}
