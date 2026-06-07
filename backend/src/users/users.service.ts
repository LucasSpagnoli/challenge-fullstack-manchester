import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";


@Injectable()
export class UsersService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async findOne(id: number) {
        if (!id) {
            throw new BadRequestException('ID é obrigatório');
        }

        const user = this.databaseService.user.findUnique({ where: { id } })

        if (!user) {
            throw new BadRequestException('User não encontrado');
        }

        return user
    }

    async create(createUserDTO: Prisma.UserCreateInput) {
        // verificação?

        if (!createUserDTO) {
            throw new BadRequestException('Body ausente');
        }

        return this.databaseService.user.create({ data: createUserDTO })
    }

    async update(updateUserDTO: Prisma.UserUpdateInput, id: number) {
        // verificação?

        if (!updateUserDTO) {
            throw new BadRequestException('Body ausente');
        }

        return this.databaseService.user.update({ where: { id }, data: updateUserDTO })
    }

    async delete(id: number) {
        return this.databaseService.user.delete({ where: { id } })
    }
}
