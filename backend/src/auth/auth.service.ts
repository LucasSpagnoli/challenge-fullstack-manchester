import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';

type AuthInput = { email: string; password: string }
type SignInData = { userId: number; name: string }

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseService: DatabaseService,
        private jwtService: JwtService
    ) { }

    async signIn(user: SignInData) {
        const tokenPayload = {
            sub: user.userId,
            name: user.name
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload)

        return { username: user.name, userId: user.userId }
    }

    async validateUser(input: AuthInput) {
        const user = await this.databaseService.user.findUnique({ where: { email: input.email } })

        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}
