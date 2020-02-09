import { Component, OnInit,ViewContainerRef } from '@angular/core';

import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public Name: any;
  public email: any;
  public password: any;
  public retypepassword:any;
  public result:any;

  constructor(public appService: AppService,
    public router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);

    }

  ngOnInit() {
  }

  public verifyPassword: any = (event: any) => {
  
    if (this.retypepassword!=this.password) { // 13 is keycode of enter.
          this.toastr.warning('Password doesnt match')
          this.result='False'
    }
    else
    {
      this.result='True'
    }

  }
  public goToSignIn: any = () => {

    this.router.navigate(['/']);

  }
  public signupFunction: any = () => {

    if (!this.Name) {
      this.toastr.warning('enter your name')
     

    }  else if (!this.email) {
      this.toastr.warning('enter email')

    } else if (!this.password) {
      this.toastr.warning('enter password')

    } else {

      let data = {
        Name: this.Name,
        email: this.email,
        password: this.password
      }

      console.log(data);
      if(this.result=='True')
      {

      this.appService.signupFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {

            this.toastr.success('Signup successful');

           setTimeout(() => {

              this.goToSignIn();

            }, 2000);

          } else {

            this.toastr.error(apiResponse.message);

          }

        }, (err) => {

          this.toastr.error('some error occured');

        });

    } // end condition
  }
  

  } // end signupFunction


}
