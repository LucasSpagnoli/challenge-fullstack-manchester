import { ConflictException, ForbiddenException, Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDTO } from 'src/types/create-user.dto';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly authService: AuthService,
    ) {}

    async create(createUserDTO: CreateUserDTO) {
        return this.authService.createUser(createUserDTO);
    }

    async findAll() {
        try {
            const users = await this.databaseService.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    preferences: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            return users;
        } catch (error) {
            const err = error as Error;
            this.logger.error(`Falha ao listar usuários: ${err.message}\n`, err.stack);
            throw new InternalServerErrorException('Não foi possível listar os usuários.');
        }
    }

    async remove(id: number) {
        try {
            const user = await this.databaseService.user.findUnique({ where: { id } });

            if (!user) {
                throw new NotFoundException('Usuário não encontrado.');
            }

            if (user.role === 'admin') {
                throw new ForbiddenException('Não é possível remover um administrador.');
            }

            return await this.databaseService.user.delete({ where: { id } });
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof ForbiddenException) throw error;

            const err = error as Error;
            this.logger.error(`Falha ao remover usuário [ID: ${id}]: ${err.message}\n`, err.stack);
            throw new InternalServerErrorException('Não foi possível remover o usuário.');
        }
    }
}
