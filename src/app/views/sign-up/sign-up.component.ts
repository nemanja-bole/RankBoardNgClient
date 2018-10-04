import { EmailValidators } from '../../common/validators/email.validators';
import { BadInputError } from '../../common/errors/bad-input-error';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppError } from '../../common/errors/app-error';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private emailValidators: EmailValidators) { }

  signUpForm = new FormGroup({
    "firstName": new FormControl('', Validators.required),
    "lastName": new FormControl('', Validators.required),
    "email": new FormControl(
      '', 
      [
        Validators.required, 
        Validators.email, 
        Validators.pattern(new RegExp("@svea.com$"))
      ],
      this.emailValidators.shouldBeUnique.bind(this.emailValidators)
    ),
    "password": new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  get firstName(){
    return this.signUpForm.get("firstName");
  }

  get lastName(){
    return this.signUpForm.get("lastName");
  }

  get email(){
    return this.signUpForm.get("email");
  }

  get password(){
    return this.signUpForm.get("password");
  }  

  signUp(){
    this.authService.signUp(this.signUpForm.value)
    .subscribe(result => {
      if(result){
        this.router.navigate(['/registration-success']);
      }
    },
    (error: AppError) => {
      if(error instanceof BadInputError){
        this.signUpForm.setErrors({
          invalidSignUp: true,
        });
      }
      else {
        throw error;
      }
    });
  }

}
