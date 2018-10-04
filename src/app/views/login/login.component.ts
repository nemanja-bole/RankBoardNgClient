import { BadInputError } from '../../common/errors/bad-input-error';
import { AppError } from '../../common/errors/app-error';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //invalidLogin: boolean;

  loginForm = new FormGroup({
    "email": new FormControl('', [Validators.required, Validators.email]),
    "password": new FormControl('', Validators.required),
  }); 

  get email(){
    return this.loginForm.get("email");
  }

  get password(){
    return this.loginForm.get("password");
  }

  constructor( 
    private router: Router,
    private route: ActivatedRoute, 
    private authService: AuthService) { 

  }

  signIn() {
    this.authService.login(this.loginForm.value)
    .subscribe(
      result => {
        if(result){
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        }
        else {
          
        }
    },
    (error: AppError) => {
      if(error instanceof BadInputError)
      {
        this.loginForm.setErrors({
          invalidLogin: true
        });
      }
      else {
        throw error;
      }
    });
  }
}
