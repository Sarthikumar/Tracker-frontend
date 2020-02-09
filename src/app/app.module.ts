import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { AppService } from './app.service';
import { IssueModule } from './issue/issue.module';
import { SearchComponent } from './issue/search/search.component';
import {FormsModule} from '@angular/forms';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    HttpClientModule,
    IssueModule,
    FormsModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path:'login',component:LoginComponent,pathMatch:'full'},
      {path:'reset-password/:resetauth',component:ResetPasswordComponent,pathMatch:'full'},
    {path:'',redirectTo:'login',pathMatch:'full'}

    ])

  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
