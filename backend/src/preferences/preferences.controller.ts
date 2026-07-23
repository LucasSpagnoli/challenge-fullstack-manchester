import { Body, Controller, Get, ParseIntPipe, Patch, Req, UseGuards, ForbiddenException, Param, BadRequestException } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { ClientsService } from 'src/clients/clients.service';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import type { RequestWithUser } from 'src/types/request-with-user';

@UseGuards(JwtAuthGuard)
@Controller('preferences')
export class PreferencesController {
    constructor(
        private readonly preferenceService: PreferencesService,
        private readonly clientsService: ClientsService
    ) { }

    @Get()
    async findUser(@Req() req: RequestWithUser) {
        try {
            return this.preferenceService.getPreferencesById(req.user.id, 'user');
        } catch (err) {
            throw new BadRequestException('Erro ao buscar preferências de usuário')
        }
    }

    @Get(':client_id')
    async findClient(@Req() req: RequestWithUser, @Param('client_id', new ParseIntPipe({ optional: true })) client_id: number) {
        try {
            await this.clientsService.findOne(client_id, req.user.id);
            return this.preferenceService.getPreferencesById(client_id, 'client');
        } catch (err) {
            throw new ForbiddenException('Acesso a este cliente negado')
        }
    }

    @Patch()
    async updateUserPreferences(@Body('preferences') preferences: string[], @Req() req: RequestWithUser) {
        try {
            return this.preferenceService.updatePreferences({ id: req.user.id, preferences, role: 'user' });
        } catch (err) {
            throw new BadRequestException('Erro ao atualizar preferência de usuário')
        }
    }

    @Patch(':client_id')
    async updateClientPreferences(@Body('preferences') preferences: string[], @Req() req: RequestWithUser, @Param('client_id', new ParseIntPipe({ optional: true })) client_id: number) {
        try {
            await this.clientsService.findOne(client_id, req.user.id);
            return this.preferenceService.updatePreferences({ id: client_id, preferences, role: 'client' });
        } catch (err) {
            throw new ForbiddenException('Acesso a este cliente negado')
        }
    }
}