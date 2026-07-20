import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import type { PreferencesPayload } from 'src/types/create-preferences.dto';
import type { RequestWithUser } from 'src/types/request-with-user';

@UseGuards(JwtAuthGuard)
@Controller('preferences')
export class PreferencesController {
    constructor(private readonly preferenceService: PreferencesService) { }

    @Get(":id")
    findById(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
        return this.preferenceService.getPreferencesById(id, req.user.role);
    }

    @Post()
    createPreferences(@Body(ValidationPipe) preferencesDTO: PreferencesPayload, @Req() req: RequestWithUser) {
        return this.preferenceService.createPreferences({
            ...preferencesDTO,
            role: req.user.role
        });
    }

    @Patch()
    updatePreferences(@Body(ValidationPipe) preferencesDTO: PreferencesPayload, @Req() req: RequestWithUser) {
        return this.preferenceService.updatePreferences({
            ...preferencesDTO,
            role: req.user.role
        });
    }
}