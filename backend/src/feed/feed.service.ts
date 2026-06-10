import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FeedService {
    constructor(
        private databaseService: DatabaseService,
    ) { }

    async getPreferences(userId: number) {
        const preferences = await this.databaseService.preferences.findUnique({ where: { user_id: userId } })
        if (!preferences) {
            throw new Error("ID não atrelado a nenhum usuário ou interesse")
        }
        const userPreferences = preferences.topic
        if (!userPreferences) {
            throw new BadRequestException("Usuário sem interesses registrados")
        }
        return userPreferences
    }
}
