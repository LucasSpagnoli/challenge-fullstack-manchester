import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PreferencesModule } from './preferences/preferences.module';

@Module({
  imports: [DatabaseModule, AuthModule, PreferencesModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
