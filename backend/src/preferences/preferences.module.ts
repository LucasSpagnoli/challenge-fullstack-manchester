import { Module } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ClientsService } from 'src/clients/clients.service';

@Module({
  imports: [DatabaseModule],
  providers: [PreferencesService, ClientsService],
  controllers: [PreferencesController]
})
export class PreferencesModule {}
