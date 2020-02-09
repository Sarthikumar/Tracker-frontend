import { Component,OnChanges, Input, EventEmitter, Output, OnInit ,ViewContainerRef } from '@angular/core';
import { AppService } from './../../app.service';

import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public searchText:any;
  @Input() userName: any;
  public fullname:any;
  public firstName:any;
  
  

  constructor( public AppService:AppService,
    public router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this.fullname=this.userName.split(" ");
    this.firstName=this.fullname[0];


  }
  public goToLogout:any=()=>{
    let UserId=this.AppService.getUserInfoFromLocalstorage()["userId"];
    this.AppService.logoutFunction(UserId)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {

        this.toastr.success('Logout successful');
        setTimeout(() => {

        this.router.navigate(['/']);
        }, 2000);

      } else {

        this.toastr.error(apiResponse.message)
      

      }

    }, (err) => {
      this.toastr.error('some error occured')

    });

  }

}
