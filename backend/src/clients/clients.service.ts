import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClientsService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async create(data: Prisma.ClientsUncheckedCreateInput) {
    if (!data.name || !data.number) {
      throw new BadRequestException("Nome ou número de celular ausentes.");
    }
    const newClient = await this.databaseService.clients.create({ data });
    return { Client: newClient };
  }

  async findAll(user_id: number) {
    return await this.databaseService.clients.findMany({ where: { user_id } });
  }

  async findOne(id: number, user_id: number) {
    const client = await this.databaseService.clients.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException("Cliente inexistente.");
    }

    if (client.user_id !== user_id) {
      throw new ForbiddenException("Cliente pertence a outro usuário.");
    }

    return client;
  }

  async update(client_id: number, user_id: number, data: Prisma.ClientsUpdateInput) {
    await this.findOne(client_id, user_id);

    return await this.databaseService.clients.update({
      where: { id: client_id },
      data,
    });
  }

  async delete(id: number, user_id: number) {
    await this.findOne(id, user_id);

    return await this.databaseService.clients.delete({ where: { id } });
  }
}