import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PreferencesModule } from './preferences/preferences.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, PreferencesModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
