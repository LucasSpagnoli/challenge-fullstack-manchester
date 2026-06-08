import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config";
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './Strategies/local.strategy';
import { JwtStrategy } from './Strategies/jwt.strategy';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' }
    }),
    DatabaseModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
