import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { 

  }
  canActivate(route, state: RouterStateSnapshot) {
    if(this.authService.isLoggedIn && this.authService.currentUser.is_superuser){
      return true;
    }
    //todo: implement no access page
    //this.router.navigate(['/no-access'])
    return false;
  }  

}
