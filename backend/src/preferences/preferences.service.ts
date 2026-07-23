import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PreferencesPayload } from 'src/types/PreferencesPayload';
import { Role } from 'src/types/role';

@Injectable()
export class PreferencesService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async updatePreferences({ id, preferences, role }: PreferencesPayload) {
        if (!id) throw new BadRequestException("ID ausente.");

        const where = { id };
        const data = { preferences };

        const newPrefs = role === 'user'
            ? await this.databaseService.user.update({ where, data })
            : await this.databaseService.clients.update({ where, data });

        return newPrefs.preferences
    }

    async getPreferencesById(id: number, role: Role) {
        if (!id) throw new BadRequestException("ID ausente.");

        const user = role === 'user'
            ? await this.databaseService.user.findUnique({ where: { id } })
            : await this.databaseService.clients.findUnique({ where: { id } });

        if (!user) throw new NotFoundException("Preferências inexistentes ou não encontradas.");

        return user.preferences;
    }
}