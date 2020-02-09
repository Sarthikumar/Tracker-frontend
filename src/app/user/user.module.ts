import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import {FormsModule} from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr';
import {RouterModule,Routes} from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    RouterModule.forChild([
      {path:'sign-up',component:SignupComponent},
      {path:'forgot-password',component:ForgotPasswordComponent}
    ])
  ],
  declarations: [SignupComponent, LoginComponent, ResetPasswordComponent, ForgotPasswordComponent]
})
export class UserModule { }
