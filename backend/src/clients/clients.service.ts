import { ForbiddenException, Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateClientDTO, UpdateClientDTO } from 'src/types/clients.dto'; // Ajuste o caminho se necessário

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async create(data: CreateClientDTO & { user_id: number }) {
    try {
      const newClient = await this.databaseService.clients.create({ data });
      return { Client: newClient };
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Falha ao registrar cliente: ${err.message}\n`, err.stack);
      throw new InternalServerErrorException("Não foi possível registrar o cliente.");
    }
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

  async update(client_id: number, user_id: number, data: UpdateClientDTO) {
    await this.findOne(client_id, user_id); // analisa se o user tem um cliente com aquele id, detecta erro automaticamente 

    try {
      return await this.databaseService.clients.update({
        where: { id: client_id },
        data,
      });
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Falha ao atualizar cliente [ID: ${client_id}]: ${err.message}\n`, err.stack);
      throw new InternalServerErrorException("Não foi possível atualizar o cliente.");
    }
  }

  async delete(id: number, user_id: number) {
    await this.findOne(id, user_id);

    try {
      return await this.databaseService.clients.delete({ where: { id } });
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Falha ao deletar cliente [ID: ${id}]: ${err.message}\n`, err.stack);
      throw new InternalServerErrorException("Não foi possível remover o cliente.");
    }
  }
}