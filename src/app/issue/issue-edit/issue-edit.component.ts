import { Component, OnInit,ViewContainerRef, OnDestroy } from '@angular/core';
import { AppService } from './../../app.service';

import {ActivatedRoute,Router} from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {
  public loginUser:any;
  public email:any;
  public searchText:any;
  public IssueId:any;
  public currentIssue:any;
  public previous_assignemail:any;
  public possibleCategories=["backlog","in-progress","in-test","done"];

  constructor(
    public AppService: AppService,
    private _route:ActivatedRoute,
    private router:Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.loginUser=AppService.getName();
    this.email=AppService.getEmail();
    this.IssueId=this._route.snapshot.paramMap.get('IssueId');
   }

  ngOnInit() {
    this.viewIssue()

  }
  public viewIssue:any=()=>{
    this.AppService.viewsingleIssue(this.IssueId)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.success(apiResponse.message)
        this.currentIssue=apiResponse.data
        this.previous_assignemail=this.currentIssue.assignemail
        this.currentIssue.previousemail=this.previous_assignemail

      } else {

        this.toastr.error(apiResponse.message)
      }
    }, (err) => {
      this.toastr.error('some error occured')

    });

  }
  public editIssue:any=()=>{
    console.log(this.currentIssue)
    this.AppService.editsingleissue(this.IssueId,this.currentIssue)
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
