import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PreferencesPayload } from 'src/types/preferences.dto';
import { Role } from 'src/types/role';

@Injectable()
export class PreferencesService {
    private readonly logger = new Logger(PreferencesService.name);

    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async updatePreferences({ id, preferences, role }: PreferencesPayload) {
        try {
            const where = { id };
            const data = { preferences };

            const newPrefs = role === 'user'
                ? await this.databaseService.user.update({ where, data })
                : await this.databaseService.clients.update({ where, data });

            return newPrefs.preferences;
        } catch (error) {
            const err = error as Error;
            this.logger.error(`Erro ao atualizar preferências [ID: ${id}]: ${err.message}\n`, err.stack);
            throw new InternalServerErrorException("Inviável atualizar as preferências no momento.");
        }
    }

    async getPreferencesById(id: number, role: Role) {
        try {
            const record = role === 'user'
                ? await this.databaseService.user.findUnique({ where: { id } })
                : await this.databaseService.clients.findUnique({ where: { id } });

            if (!record) {
                throw new NotFoundException("Entidade inexistente.");
            }

            return record.preferences;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;

            const err = error as Error;
            this.logger.error(`Erro ao resgatar preferências [ID: ${id}]: ${err.message}\n`, err.stack);
            throw new InternalServerErrorException("Impossível consultar as preferências.");
        }
    }
}