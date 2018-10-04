import { AuthHttp } from 'angular2-jwt';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CompetitionService extends DataService {
    
    constructor(http: AuthHttp) { 
        super("api/competitions/", http);
    }
}