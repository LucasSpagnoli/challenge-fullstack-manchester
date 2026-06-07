import { Body, Controller, Get, HttpCode, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './Guards/local.guard';
import type { Request } from 'express';
import { JwtAuthGuard } from './Guards/jwt.guard';
import { CreateUserDTO } from 'src/types/DTO/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }

    @Post('login')
    @HttpCode(200)
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        if (!req.user) {
            throw new Error("req.user not found")
        }
        return this.authService.signIn({
            userId: req.user.id,
            name: req.user.name
        }) // usuário validado pelo guard, atrelado ao request pelo passport
    }

    @Post("register")
    register(@Body(ValidationPipe) createUserDTO: CreateUserDTO) {
        return this.usersService.create(createUserDTO)
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        return req.user // usuário validado pelo guard
    }
}
