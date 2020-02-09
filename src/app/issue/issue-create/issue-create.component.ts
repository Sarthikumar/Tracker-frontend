import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { AppService } from './../../app.service';

import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent implements OnInit {
  public loginUser:any;
  public title: any;
  public assignemail:any;
  public description:any;
  public category=["backlog","in-progress","in-test","done"];
  public status:any;
  public reporteremail:any;
  public reportername:any;
  public searchText:any;
  
  constructor(public AppService: AppService,
    public router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
    this.loginUser=AppService.getName();
    this.reportername=this.loginUser
    this.reporteremail=AppService.getEmail()
    alert(this.reporteremail)
     }

  ngOnInit() {
  }
  public createIssue:any=()=>{
  
    if (!this.title) {
      this.toastr.warning('Enter title of Issue')
     

    }
    else if(!this.assignemail){
      this.toastr.warning('Enter the assignee emailId')
    }
    else if(!this.description){
      this.toastr.warning('Enter the description of an Issue')
    }
    else if(!this.status){
      this.toastr.warning('Select an status of Issue')
    }
    else
    {
    let data={
      title:this.title,
      assignemail:this.assignemail,
      description:this.description,
      status:this.status,
      reportername:this.reportername,
      reporteremail:this.reporteremail
    }
    this.AppService.raiseIssue(data)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.success('Issue created sucessfully');
        console.log(apiResponse)
        setTimeout(()=>{
          this.router.navigate(['/view',apiResponse.data.IssueId]);
        },1000)

      } else {

        this.toastr.error(apiResponse.message)
      

      }

    }, (err) => {
      this.toastr.error('some error occured')

    });

  }
}

}
