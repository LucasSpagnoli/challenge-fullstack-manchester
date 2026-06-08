import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import type { CreatePreferencesDto } from 'src/types/CreatePreferencesDTO';


@Controller('preferences')
export class PreferencesController {
    constructor(private readonly preferenceService: PreferencesService) { }

    @Get(":id")
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.preferenceService.getPreferencesById(id)
    }

    @Post()
    createPreferences(@Body(ValidationPipe) preferencesDTO: CreatePreferencesDto) {
        return this.preferenceService.createUserPreferences(preferencesDTO)
    }

    @Patch()
    updatePreferences(@Body(ValidationPipe) preferencesDTO: CreatePreferencesDto) {
        return this.preferenceService.updatePreferences(preferencesDTO)
    }
}
