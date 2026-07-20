import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/types/create-user.dto';
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
            name: user.name,
            role: 'user'
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload);

        return { accessToken, name: user.name, userId: user.userId };
    }

    async register(createUserDTO: CreateUserDTO) {
        if (!createUserDTO) {
            throw new BadRequestException('Body ausente');
        }

        const userExists = await this.databaseService.user.findUnique({ where: { email: createUserDTO.email } });
        if (userExists) {
            throw new ConflictException("Usuário já existente");
        }

        const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
        const newUser = await this.databaseService.user.create({ data: { ...createUserDTO, password: hashedPassword } });

        if (!newUser) {
            throw new Error("A criação do novo usuário falhou");
        }

        const tokenPayload = {
            sub: newUser.id,
            name: newUser.name,
            role: 'user'
        };
        const accessToken = await this.jwtService.signAsync(tokenPayload);

        const newUserPreferences = await this.preferenceService.createPreferences({ owner_id: newUser.id, topic: [], role: 'user' });

        const { password, ...userWithoutPassword } = newUser;

        return { accessToken, newUser: userWithoutPassword, Preferences: newUserPreferences };
    }

    async validateUser(input: AuthInput) {
        const foundUser = await this.databaseService.user.findUnique({ where: { email: input.email } });

        if (!foundUser) {
            throw new UnauthorizedException("Usuário não encontrado");
        }

        const isPassCorrect = await bcrypt.compare(
            input.password,
            foundUser.password
        );

        if (!isPassCorrect) {
            throw new UnauthorizedException("Senha incorreta");
        }

        const { password, ...user } = foundUser;
        return user;
    }
}