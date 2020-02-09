import { Component,OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from './../../app.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;

 

  constructor(public appService: AppService,
    public router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
   
  }
  public forgotPassword: any = () => {

    this.router.navigate(['/forgot-password']);

  } 
  

  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);

  } 
  public signinFunction: any = () => {

    if (!this.email) {
      this.toastr.warning('enter email')


    } else if (!this.password) {

      this.toastr.warning('enter password')


    } else {

      let data = {
        email: this.email,
        password: this.password
      }

      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {
          alert(apiResponse.message)

          if (apiResponse.status === 200) {
            console.log(apiResponse)
            console.log(apiResponse.data.authToken)

             Cookie.set('authtoken', apiResponse.data.authToken);
            
             Cookie.set('UserId', apiResponse.data.userDetails.userId);
            
             Cookie.set('Userdetail', apiResponse.data.userDetails.Name + ' ' + apiResponse.data.userDetails.email+''+apiResponse.data.authToken);
           
             this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
              console.log(Cookie.get('authtoken'));
              // alert(this.appService.getUserInfoFromLocalstorage()["userId"]);
              alert(this.appService.getName())
               this.toastr.success('Signin successful');
               this.router.navigate(['/issue']);

          } else if(apiResponse.status == 404) {

            this.toastr.error(apiResponse.message)
          

          }

        }, (err) => {
          this.toastr.error('some error occured')

        });

    } // end condition

  } // end signinFunction
}
