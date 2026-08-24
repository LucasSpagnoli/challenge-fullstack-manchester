import { Body, Controller, Get, HttpCode, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './Guards/local.guard';
import type { Request } from 'express';
import { JwtAuthGuard } from './Guards/jwt.guard';
import { AuthRole } from 'src/types/role';
import { CreateAdminDTO } from 'src/types/create-admin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @HttpCode(200)
    @UseGuards(LocalGuard)
    async login(@Req() req: Request) {
        if (!req.user) {
            throw new Error('req.user not found');
        }
        const authData = await this.authService.signIn({
            userId: req.user.id,
            name: req.user.name,
            role: req.user.role as AuthRole,
        });
        return authData;
    }

    @Post('admin')
    async createAdmin(
        @Body(ValidationPipe) createAdminDTO: CreateAdminDTO,
    ) {
        return this.authService.createAdmin(createAdminDTO, createAdminDTO.adminSecret);
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        return req.user;
    }

    // @Post('register')
    // async register(@Body(ValidationPipe) createUserDTO: CreateUserDTO) {
    //     const newUser = await this.authService.register(createUserDTO);
    //     return newUser;
    // }
}
