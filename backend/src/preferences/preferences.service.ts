import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Preferences } from '@prisma/client';

@Injectable()
export class PreferencesService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async createUserPreferences({ user_id, topic }: Preferences) {
        if (!user_id) {
            throw new BadRequestException("ID de usuário ausente")
        }
        return await this.databaseService.preferences.create({ data: { user_id, topic } })
    }

    async updatePreferences({ user_id, topic }: Preferences) {
        if (!user_id) {
            throw new BadRequestException("ID de usuário ausente")
        }
        return await this.databaseService.preferences.update({ where: { user_id }, data: { topic } })
    }
}