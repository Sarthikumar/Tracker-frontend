import { Component, OnInit,ViewContainerRef, OnDestroy,ViewChild, ElementRef} from '@angular/core';
import { AppService } from './../../app.service';

import {ActivatedRoute,Router} from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-issue-view',
  templateUrl: './issue-view.component.html',
  styleUrls: ['./issue-view.component.css']
})
export class IssueViewComponent implements OnInit {
  @ViewChild('scrollMe', { read: ElementRef })
  public scrollMe:ElementRef;
  public loginUser:any;
  public email:any;
  public searchText:any;
  public IssueId:any;
  public currentIssue:any=[];
  public commentsList:any=[];
  public pageValue: number = 1;
  public scrollToChatTop:boolean= false;
  public loadingPreviouscomment: boolean = false;
  public previousData:any=[];
  public postissueComment:any;
  public watcherMember:boolean=true;
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
    this.viewWatcher()
    this.viewIssue()
    this.viewComment()
    

  }
  public viewIssue:any=()=>{
    this.AppService.viewsingleIssue(this.IssueId)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.success(apiResponse.message)
        this.currentIssue=apiResponse.data
      

      } else {

        this.toastr.error(apiResponse.message)
      }
    }, (err) => {
      this.toastr.error('some error occured')

    });

  }
  public viewComment:any=()=>{
    this.AppService.viewallComments(this.IssueId,this.pageValue)
    .subscribe((apiResonse)=>{
      if(apiResonse.status===200)
      {
        this.toastr.success(apiResonse.message)
           
        this.previousData=this.commentsList.concat(apiResonse.data)         
        this.commentsList=this.previousData
        console.log(this.commentsList)
        setTimeout(() => {
          this.loadingPreviouscomment=false
        }, 2000);


      }
      else{
        setTimeout(() => {
          this.loadingPreviouscomment=false
        }, 2000);
        this.toastr.error(apiResonse.message)
       
      }
    },(err)=>{
      this.toastr.error('some error occured')
    

    });

  }
  
  public listMoreIssues:any=()=>{
    this.pageValue=this.pageValue+1;
    this.scrollToChatTop = true;
    this.loadingPreviouscomment = true;
    this.viewComment();
  }
  public comment:any=()=>{
    this.AppService.postComment(this.postissueComment,this.IssueId,this.loginUser)
    .subscribe((apiResponse)=>{
      if (apiResponse.status === 200) {
        this.toastr.success(apiResponse.message)
       
        this.previousData= this.commentsList.concat(apiResponse.data)
        this.commentsList=this.previousData
       
        this.postissueComment="";

      } else {

        this.toastr.error(apiResponse.message)
      }
    }, (err) => {
      this.toastr.error('some error occured')



    });

  }
  public addWatcher:any=()=>{
    let data={
      IssueId:this.IssueId,
      email:this.email
    }
    this.AppService.addnewWatcher(data).subscribe((apiResponse)=>{
      if(apiResponse.status===200)
      {
        this.toastr.success(apiResponse.message)
      }
      else
      {
        this.toastr.error(apiResponse.message)
      }
    },(err)=>{
        this.toastr.error('some error occured')
    });

  }
  public viewWatcher:any=()=>{
    this.AppService.viewWatcherUser(this.IssueId,this.email).subscribe((apiResponse)=>{
      if(apiResponse.status===200)
      {
        this.watcherMember=false;
        alert(this.watcherMember)
        this.toastr.success(apiResponse.message)
      }
      else
      {
        this.watcherMember=true;
        this.toastr.error(apiResponse.message)
      }
    },(err)=>{
      this.toastr.error('some error occured')

    
    });
  }
}
