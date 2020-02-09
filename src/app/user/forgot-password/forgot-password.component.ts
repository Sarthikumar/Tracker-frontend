import { Component, OnInit,ViewContainerRef, OnDestroy } from '@angular/core';
import { AppService } from './../../app.service';

import {ActivatedRoute,Router} from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public email:any;

  constructor(
    public AppService: AppService,
    private _route:ActivatedRoute,
    private router:Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }
  public emailFunction:any=()=>{
    this.AppService.emailVerify(this.email)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.success(apiResponse.message)
  
      } else {

        this.toastr.error(apiResponse.message)
      }
    }, (err) => {
      this.toastr.error('some error occured')

    });

  }
}
