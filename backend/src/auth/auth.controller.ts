import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './Guards/local.guard';
import type { Request } from 'express';
import { JwtAuthGuard } from './Guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        if (!req.user){
            throw new Error("req.user not found")
        }
        return this.authService.signIn({
            userId: req.user.id,
            name: req.user.name
        }) // usuário validado pelo guard, atrelado ao request pelo passport
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        return req.user // usuário validado pelo guard
    }
}
