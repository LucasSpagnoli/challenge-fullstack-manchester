import { Body, Controller, Get, Query, ParseIntPipe, Patch, Post, Req, UseGuards, ValidationPipe, ForbiddenException } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { ClientsService } from 'src/clients/clients.service';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import type { PreferencesPayload } from 'src/types/create-preferences.dto';
import type { RequestWithUser } from 'src/types/request-with-user';

@UseGuards(JwtAuthGuard)
@Controller('preferences')
export class PreferencesController {
    constructor(
        private readonly preferenceService: PreferencesService,
        private readonly clientsService: ClientsService
    ) { }

    @Get()
    async find(
        @Query('target_id', ParseIntPipe) target_id: number,
        @Query('role') role: 'user' | 'client',
        @Req() req: RequestWithUser
    ) {
        if (role === 'client') {
            await this.clientsService.findOne(target_id, req.user.id); // Atesta jurisdição
        } else if (target_id !== req.user.id) {
            throw new ForbiddenException("Acesso denegado a credenciais alheias.");
        }

        return this.preferenceService.getPreferencesById(target_id, role);
    }

    @Post()
    async createPreferences(@Body(ValidationPipe) preferencesDTO: PreferencesPayload, @Req() req: RequestWithUser) {
        if (preferencesDTO.role === 'client') {
            await this.clientsService.findOne(preferencesDTO.owner_id, req.user.id);
        } else if (preferencesDTO.owner_id !== req.user.id) {
            throw new ForbiddenException("Acesso denegado.");
        }

        return this.preferenceService.createPreferences(preferencesDTO);
    }

    @Patch()
    async updatePreferences(@Body(ValidationPipe) preferencesDTO: PreferencesPayload, @Req() req: RequestWithUser) {
        if (preferencesDTO.role === 'client') {
            await this.clientsService.findOne(preferencesDTO.owner_id, req.user.id);
        } else if (preferencesDTO.owner_id !== req.user.id) {
            throw new ForbiddenException("Acesso denegado.");
        }

        return this.preferenceService.updatePreferences(preferencesDTO);
    }
}