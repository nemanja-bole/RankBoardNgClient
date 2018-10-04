import { AuthService } from './auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggedGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService) {
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(!this.authService.isLoggedIn()){
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}