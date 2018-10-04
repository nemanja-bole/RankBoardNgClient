import { AbstractControl, ValidationErrors } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Injectable } from "@angular/core";
import { AppError } from "../errors/app-error";

@Injectable()
export class EmailValidators {

    debouncer: any;

    constructor(private authService: AuthService) { }

    shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {

        clearTimeout(this.debouncer);

        return new Promise((resolve, reject) => {            
            this.debouncer = setTimeout( () => {
                this.authService.checkEmailAvailability(control.value)
                    .subscribe(result => {
                        console.log("AVAILABLE INFO", result);
                        if(result) {
                            resolve({ shouldBeUnique: true });
                        }
                        else {
                            resolve(null);
                        }
                    },
                    (error: AppError) => {
                        throw error;
                    });
            }, 1000)
            
        });
        
    }
}