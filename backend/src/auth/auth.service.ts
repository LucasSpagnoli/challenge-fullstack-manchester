import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/types/DTO/create-user.dto';
import { PreferencesService } from 'src/preferences/preferences.service';

type AuthInput = { email: string; password: string }
type SignInData = { userId: number; name: string }

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseService: DatabaseService,
        private jwtService: JwtService,
        private readonly preferenceService: PreferencesService
    ) { }

    async signIn(user: SignInData) {
        const tokenPayload = {
            sub: user.userId,
            name: user.name
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload) // cria um JWT com name, email e interestedIn[] (que será armazenado no cliente)

        return { accessToken, name: user.name, userId: user.userId }
    }

    async register(createUserDTO: CreateUserDTO) {
        if (!createUserDTO) {
            throw new BadRequestException('Body ausente');
        }

        const userExists = await this.databaseService.user.findUnique({ where: { email: createUserDTO.email } })
        if (userExists) {
            throw new ConflictException("Usuário já existente")
        }

        const hashedPassword = await bcrypt.hash(createUserDTO.password, 10)
        const newUser = await this.databaseService.user.create({ data: { ...createUserDTO, password: hashedPassword } })
        if (!newUser) {
            throw new Error("Create new user falhou")
        }

        const tokenPayload = {
            sub: newUser.id,
            name: newUser.name
        }
        const accessToken = await this.jwtService.signAsync(tokenPayload)
        const newUserPreferences = await this.preferenceService.createUserPreferences({ user_id: newUser.id, topic: [] })

        return { accessToken, newUser, Preferences: newUserPreferences }
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

        const { password, ...user } = foundUser
        console.log("Passou do validateUser")
        return user
    }
}
