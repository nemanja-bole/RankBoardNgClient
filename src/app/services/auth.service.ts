import { NotFoundError } from './../common/errors/not-found-error';
import { BadInputError } from './../common/errors/bad-input-error';
import { AppError } from './../common/errors/app-error';
import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired, AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
    private authHttp: AuthHttp,
    private http: Http,
    private router: Router) { 

  }

  login(credentials){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/auth/', JSON.stringify(credentials), { headers: headers })
    .map(response => {
      let result = response.json();

      if(result && result.token) {
        localStorage.setItem('token', result.token);
        return true;
      }

      return false;
    })
    .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(){
    return tokenNotExpired();
  }

  get currentUser(){
    let token = localStorage.getItem('token');
    if(!token){
      return null;
    }

    return new JwtHelper().decodeToken(token);
  }

  signUp(credentials) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('api/accounts/sign-up/', JSON.stringify(credentials), { headers: headers })
    .map(response => {
      let result = response.json();
      if(result){
        return true;
      }
      else {
        return false;
      }
    })
    .catch(this.handleError);
  }

  activation(token) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('api/accounts/activation/', { headers: headers, params: { token: token } })
      .map(response => {
        return true;
      })
      .catch(this.handleError);
  }

  checkEmailAvailability(email:string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      email: email
    }
    return this.http.post('api/accounts/availability/', JSON.stringify(body), { headers: headers })
    .map(response => {
        let result = response.json();
        if(result && result.registred){
          return true;
        }
        else {
          return false;
        }
    })
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
