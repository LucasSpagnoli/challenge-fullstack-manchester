import { FeedRole } from "./role";
import { IsArray, IsString } from 'class-validator';

export interface PreferencesPayload {
    id: number;
    preferences: string[];
    role: FeedRole;
}


export class UpdatePreferencesDto {
    @IsArray()
    @IsString({ each: true })
    preferences!: string[];
}