import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FeedService {
    constructor(
            private databaseService: DatabaseService,
        ) { }

    
}
