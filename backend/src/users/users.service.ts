import { BadRequestException, ConflictException, Injectable, UseGuards } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateUserDTO } from "../types/DTO/create-user.dto";
import { UpdateUserDTO } from "../types/DTO/update-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async findOne(id: number) {
        if (!id) {
            throw new BadRequestException('ID é obrigatório');
        }

        const user = await this.databaseService.user.findUnique({ where: { id } })

        if (!user) {
            throw new BadRequestException('User não encontrado');
        }

        return user
    }

    async create(createUserDTO: CreateUserDTO) {
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

        return newUser
    }

    async update(updateUserDTO: UpdateUserDTO, id: number) {
        if (!updateUserDTO) {
            throw new BadRequestException('Body ausente');
        }

        return await this.databaseService.user.update({ where: { id }, data: updateUserDTO })
    }

    async delete(id: number) {
        return await this.databaseService.user.delete({ where: { id } })
    }
}
