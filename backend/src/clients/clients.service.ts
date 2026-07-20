import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClientsService {
  constructor(
    private readonly databaseService: DatabaseService
  ) { }

  async create(createClientDto: Prisma.ClientsCreateInput) {
    if (!createClientDto?.name) {
      throw new BadRequestException("Nome do cliente ausente");
    }
    if (!createClientDto?.number) {
      throw new BadRequestException("Número do cliente ausente");
    }
    return await this.databaseService.clients.create({ data: createClientDto });
  }

  async findAll() {
    return await this.databaseService.clients.findMany();
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException("ID do cliente ausente");
    }
    const client = await this.databaseService.clients.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException("Nenhum cliente encontrado");
    }
    return client;
  }

  async update(id: number, updateClientDto: Prisma.ClientsUpdateInput) {
    if (!id) {
      throw new BadRequestException("ID do cliente ausente");
    }
    const client = await this.databaseService.clients.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException("Nenhum cliente encontrado");
    }
    return await this.databaseService.clients.update({
      where: { id },
      data: updateClientDto,
    });
  }

  async delete(id: number) {
    if (!id) {
      throw new BadRequestException("ID do cliente ausente");
    }
    const client = await this.databaseService.clients.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException("Nenhum cliente encontrado");
    }
    return await this.databaseService.clients.delete({ where: { id } });
  }
}