import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { HttpModule } from '@nestjs/axios'
import { AuthModule } from 'src/auth/auth.module';
import { CacheService } from 'src/services/cache.service';
import { InfoMoneyService } from 'src/services/infomoney.service';
import { AiService } from 'src/services/ai.services';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { ClientsService } from 'src/clients/clients.service';
import { PreferencesService } from 'src/preferences/preferences.service';

@Module({
  imports: [HttpModule, AuthModule, DatabaseModule],
  controllers: [FeedController],
  providers: [FeedService, CacheService, InfoMoneyService, AiService, DatabaseService, ClientsService, PreferencesService]
})
export class FeedModule {

}
