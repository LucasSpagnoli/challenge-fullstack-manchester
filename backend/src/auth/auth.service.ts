import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

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

        const accessToken = await this.jwtService.signAsync(tokenPayload) // cria um JWT com name, email e interestedIn[] (que será armazenado no cliente)

        return { accessToken, name: user.name, userId: user.userId }
    }

    async validateUser(input: AuthInput) {
        const foundUser = await this.databaseService.user.findUnique({ where: { email: input.email } })

        if (!foundUser) {
            console.log("Usuário não encontrado")
            throw new UnauthorizedException("Usuário não encontrado")
        }

        const isPassCorrect = await bcrypt.compare(
            input.password,
            foundUser.password
        )

        if (!isPassCorrect) {
            console.log("Senha incorreta")
            throw new UnauthorizedException("Senha incorreta")
        }

        const {password, ...user} = foundUser
        console.log("Passou do validateUser")
        return user
    }
}
