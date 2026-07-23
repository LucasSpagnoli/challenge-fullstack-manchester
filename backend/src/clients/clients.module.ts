import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PreferencesService } from 'src/preferences/preferences.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientsController],
  providers: [ClientsService, PreferencesService],
})
export class ClientsModule { }
