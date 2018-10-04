import { CompetitionService } from './services/competition.service';
import { AppErrorHandler } from './common/errors/error-handler';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthHttp, AUTH_PROVIDERS, provideAuth, AuthConfig } from 
    'angular2-jwt/angular2-jwt';


import { AppComponent } from './views/app.component';
import { LoginComponent } from './views/login/login.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { RegistrationSuccessComponent } from './views/registration-success/registration-success.component';
import { ActivationComponent } from './views/activation/activation.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { CompetitionsComponent } from './views/competitions/competitions.component';
import { FooterComponent } from './views/footer/footer.component';
import { LoggedGuard } from './services/logged-guard.service';
import { EmailValidators } from './common/validators/email.validators';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    RegistrationSuccessComponent,
    ActivationComponent,
    NavbarComponent,
    CompetitionsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '',                       component: HomeComponent,                     canActivate: [AuthGuard],   pathMatch: 'full',  }, 
      { path: 'login',                  component: LoginComponent,                    canActivate: [LoggedGuard],                     },
      { path: 'sign-up',                component: SignUpComponent,                   canActivate: [LoggedGuard],                     },
      { path: 'registration-success',   component: RegistrationSuccessComponent,      canActivate: [LoggedGuard],                     },
      { path: 'activation/:token',      component: ActivationComponent,               canActivate: [LoggedGuard],                     },
      { path: 'competitions',           component: CompetitionsComponent,             canActivate: [AuthGuard],                       }, 
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    LoggedGuard,
    AUTH_PROVIDERS,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    EmailValidators,
    CompetitionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }