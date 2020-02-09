import { Component, OnInit ,ViewContainerRef} from '@angular/core';

import { AppService } from './../../app.service';

import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-issue-user',
  templateUrl: './issue-user.component.html',
  styleUrls: ['./issue-user.component.css']
})
export class IssueUserComponent implements OnInit {
  public loginUser:any;
  public email:any;
  public searchText:any;
  public pageValue: number = 1;
  public allIssue:any;


  constructor(
    public AppService: AppService,
    public router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ) { 
    this.toastr.setRootViewContainerRef(vcr);
    this.loginUser=AppService.getName();
    alert(this.loginUser)
    this.email=AppService.getEmail();

  }

  

  ngOnInit() {
   
    this.getAllIssue();
  }
  public getAllIssue:any=()=>{
    this.AppService.getIssue(this.email,this.pageValue)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.allIssue=apiResponse.data
        console.log(this.allIssue)

        

      } else {

        this.toastr.success(apiResponse.message)
      

      }

    }, (err) => {
      this.toastr.error('some error occured')

    });


  }
  public listMoreIssues:any=()=>{
    this.pageValue=this.pageValue+1;
    this.allIssue=[];
    this.getAllIssue();
  }
  public listPreviousIssues:any=()=>{
    this.pageValue=this.pageValue-1;
    if(this.pageValue<1)
    {
      this.pageValue=1;
      this.toastr.error('Page value cant be less then 1')
    }
    else
    {
      
      this.allIssue=[];
      this.getAllIssue();

    }
  }
  

}
