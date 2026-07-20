import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { PreferencesService } from 'src/preferences/preferences.service';

@Injectable()
export class ClientsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly preferenceService: PreferencesService
  ) { }

  async create(data: Prisma.ClientsUncheckedCreateInput) {
    if (!data.name || !data.number) {
      throw new BadRequestException("Nome ou número de celular ausentes.");
    }
    const newClient = await this.databaseService.clients.create({ data });
    const newClientPreferences = await this.preferenceService.createPreferences({ owner_id: newClient.id, topic: [], role: 'client' });
    return { Client: newClient, Preferences: newClientPreferences };
  }

  async findAll(user_id: number) {
    return await this.databaseService.clients.findMany({ where: { user_id } });
  }

  async findOne(id: number, user_id: number) {
    const client = await this.databaseService.clients.findFirst({ where: { id, user_id } });

    if (!client) {
      throw new NotFoundException("Cliente inexistente.");
    }

    return client;
  }

  async update(id: number, user_id: number, data: Prisma.ClientsUpdateInput) {
    await this.findOne(id, user_id);

    return await this.databaseService.clients.update({
      where: { id },
      data,
    });
  }

  async delete(id: number, user_id: number) {
    await this.findOne(id, user_id);

    return await this.databaseService.clients.delete({ where: { id } });
  }
}