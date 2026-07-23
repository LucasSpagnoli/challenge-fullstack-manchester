import { Controller, Get, HttpCode, Post, Req, Res, UseGuards, ValidationPipe, Body } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalGuard } from './Guards/local.guard';
import { JwtAuthGuard } from './Guards/jwt.guard';
import { CreateUserDTO } from 'src/types/create-user.dto';

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @HttpCode(200)
    @UseGuards(LocalGuard)
    async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        if (!req.user) throw new Error('req.user not found');

        const authData = await this.authService.signIn({
            userId: req.user.id,
            name: req.user.name,
        });

        res.cookie('auth_token', authData.accessToken, COOKIE_OPTIONS);
        return { userId: authData.userId, name: authData.name };
    }

    @Post('register')
    async register(
        @Body(ValidationPipe) createUserDTO: CreateUserDTO,
        @Res({ passthrough: true }) res: Response,
    ) {
        const newUser = await this.authService.register(createUserDTO);
        res.cookie('auth_token', newUser.accessToken, COOKIE_OPTIONS);
        return newUser.newUser;
    }

    @Post('logout')
    @HttpCode(200)
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('auth_token', COOKIE_OPTIONS);
        return { success: true };
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        return req.user;
    }
}