import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueUserComponent } from './issue-user/issue-user.component';

import {FormsModule} from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { CKEditorModule } from 'ng2-ckeditor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr';
import {RouterModule,Routes} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { IssueViewComponent } from './issue-view/issue-view.component';
import { IssueEditComponent } from './issue-edit/issue-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    CKEditorModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    RouterModule.forChild([ 
      { path: 'issue', component: IssueUserComponent },
      { path: 'create', component: IssueCreateComponent },
      {path: 'search/:searchText',component:SearchComponent,pathMatch:'full'},
      {path: 'view/:IssueId',component:IssueViewComponent,pathMatch:'full'},
      {path:'edit/:IssueId',component:IssueEditComponent,pathMatch:'full'}
    ]),
    SharedModule
  ],
  declarations: [IssueUserComponent, SearchComponent, IssueCreateComponent, IssueViewComponent, IssueEditComponent]
})
export class IssueModule { }

