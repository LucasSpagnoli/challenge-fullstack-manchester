import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PreferencesPayload } from 'src/types/create-preferences.dto';
import { Role } from 'src/types/role';

@Injectable()
export class PreferencesService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async createPreferences({ owner_id, topic, role }: PreferencesPayload) {
        if (!owner_id) throw new BadRequestException("ID ausente.");

        const data = { owner_id, topic };

        return role === 'user'
            ? await this.databaseService.user_preferences.create({ data })
            : await this.databaseService.clients_preferences.create({ data });
    }

    async updatePreferences({ owner_id, topic, role }: PreferencesPayload) {
        if (!owner_id) throw new BadRequestException("ID ausente.");

        const where = { owner_id };
        const data = { topic };

        return role === 'user'
            ? await this.databaseService.user_preferences.update({ where, data })
            : await this.databaseService.clients_preferences.update({ where, data });
    }

    async getPreferencesById(owner_id: number, role: Role) {
        if (!owner_id) throw new BadRequestException("ID ausente.");

        const pref = role === 'user'
            ? await this.databaseService.user_preferences.findUnique({ where: { owner_id } })
            : await this.databaseService.clients_preferences.findUnique({ where: { owner_id } });

        if (!pref) throw new NotFoundException("Preferências inexistentes ou não encontradas.");

        return pref.topic;
    }
}