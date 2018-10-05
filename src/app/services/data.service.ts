import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { AppError } from './../common/errors/app-error';
import { BadInputError } from './../common/errors/bad-input-error';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { NotFoundError } from '../common/errors/not-found-error';




@Injectable()
export class DataService {

    constructor(
        private _url: string, 
        private _http: AuthHttp) { }

    getAll() {
        return this._http.get(this._url).pipe(
            map(response => response.json()),
            catchError(this.handleError),);
    }

    create(resource) {
        return this._http.post(this._url, JSON.stringify(resource)).pipe(
            map(response => response.json()),
            catchError(this.handleError),);
    }

    update(resource) {
        return this._http.put(this._url + resource.id, JSON.stringify(resource)).pipe(
            map(response => response.json()),
            catchError(this.handleError),);
    }

    delete(id) {
        return this._http.delete(this._url + id).pipe(
            map(response => response.json()),
            catchError(this.handleError),);
    }



    private handleError(error: Response){
        if(error.status === 400){
            return observableThrowError(new BadInputError(error.json()));
        }

        if(error.status === 404) {
            return observableThrowError(new NotFoundError());
        }
        
        return observableThrowError(new AppError(error.json()));
        
    }
}