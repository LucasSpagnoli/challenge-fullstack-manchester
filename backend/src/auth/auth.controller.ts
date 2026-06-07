import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body() input: { name: string; email: string; password: string }) {
        return this.authService.validateUser(input)
    }
}
