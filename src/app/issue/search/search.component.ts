import { Component, OnInit, OnDestroy ,ViewContainerRef} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

import { AppService } from './../../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public loginUser:any;
  public searchIssue: any;
  public allsearchIssue:any;
  public pageValue: number = 1;
  public searchText:any;

  constructor(private _route:ActivatedRoute,
    private router:Router,
    public AppService: AppService,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) 
    { 
      this.toastr.setRootViewContainerRef(vcr);
    this.loginUser=AppService.getName();

    }

  ngOnInit() {

    this.searchIssue= this._route.snapshot.paramMap.get('searchText')

    this.searchIssuedetail();


  }
  public searchIssuedetail:any=()=>{
    this.AppService.searchIssueservice(this.searchIssue,this.pageValue)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.allsearchIssue=apiResponse.data
        console.log(this.allsearchIssue)

        

      } else {
        this.allsearchIssue=[]

        this.toastr.error(apiResponse.message)
      

      }

    }, (err) => {
      this.toastr.error('some error occured')

    });



  }
  public listMoreIssues:any=()=>{
    this.pageValue=this.pageValue+1;
    this.allsearchIssue=[];
    this.searchIssuedetail();
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
      
      this.allsearchIssue=[];
      this.searchIssuedetail();

    }
  }
  public listsearch:any=()=>{
      this.searchIssue=this.searchText;
      this.searchIssuedetail();

  }


}
