import { Component, OnInit,ViewContainerRef, OnDestroy } from '@angular/core';
import { AppService } from './../../app.service';

import {ActivatedRoute,Router} from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public resetauth:any;
  public password:any;
  public retypepassword:any;

  constructor(
    public AppService: AppService,
    private _route:ActivatedRoute,
    private router:Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ) { 
    this.toastr.setRootViewContainerRef(vcr);
    this.resetauth=this._route.snapshot.paramMap.get('resetauth');
  }

  ngOnInit() {
  }

  public verifyPassword: any = (event: any) => {
  
    if (this.retypepassword!=this.password) { // 13 is keycode of enter.
          this.toastr.warning('Password doesnt match')
    }
    else
    {
      this.toastr.success('Input and confirm passowrd match')
    }

  }
  public resetFunction:any=()=>{
    this.AppService.resetuserpassword(this.resetauth,this.password)
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
