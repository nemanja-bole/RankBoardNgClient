import { AppError } from './../common/errors/app-error';
import { BadInputError } from './../common/errors/bad-input-error';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { NotFoundError } from '../common/errors/not-found-error';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

    constructor(
        private _url: string, 
        private _http: AuthHttp) { }

    getAll() {
        return this._http.get(this._url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    create(resource) {
        return this._http.post(this._url, JSON.stringify(resource))
            .map(response => response.json())
            .catch(this.handleError);
    }

    update(resource) {
        return this._http.put(this._url + resource.id, JSON.stringify(resource))
            .map(response => response.json())
            .catch(this.handleError);
    }

    delete(id) {
        return this._http.delete(this._url + id)
            .map(response => response.json())
            .catch(this.handleError);
    }



    private handleError(error: Response){
        if(error.status === 400){
            return Observable.throw(new BadInputError(error.json()));
        }

        if(error.status === 404) {
            return Observable.throw(new NotFoundError());
        }
        
        return Observable.throw(new AppError(error.json()));
        
    }
}