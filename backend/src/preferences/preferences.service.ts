import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import type { CreatePreferencesDto } from 'src/types/create-preferences.dto';

@Injectable()
export class PreferencesService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async createUserPreferences({ user_id, topic }: CreatePreferencesDto) {
        if (!user_id) {
            throw new BadRequestException("ID de usuário ausente")
        }
        return await this.databaseService.preferences.create({ data: { user_id, topic } })
    }

    async updatePreferences({ user_id, topic }: CreatePreferencesDto) {
        if (!user_id) {
            throw new BadRequestException("ID de usuário ausente")
        }
        return await this.databaseService.preferences.update({ where: { user_id }, data: { topic } })
    }

    async getPreferencesById(user_id: number) {
        if (!user_id) {
            throw new BadRequestException("ID do usuário ausente")
        }
        const userPref = await this.databaseService.preferences.findUnique({ where: { user_id } })
        if (!userPref) {
            throw new BadRequestException("Nenhum usuário encontrado")
        }
        return userPref
    }
}