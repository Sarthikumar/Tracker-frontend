import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {HttpErrorResponse,HttpParams} from '@angular/common/http';
@Injectable()
export class AppService {
  private url= 'http://localhost:3001';
  public Name: any;
  public Email:any;
  public authToken:any;

  constructor(public http:HttpClient) { 
    
  }
  public getUserInfoFromLocalstorage=()=>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }
  public setUserInfoInLocalStorage=(data)=>{
    localStorage.setItem('userInfo',JSON.stringify(data));
  }
  public getName():any{
    this.Name=this.getUserInfoFromLocalstorage()["Name"]
    alert(this.Name)
    return this.Name;
  }
  public getEmail():any{
    this.Email=this.getUserInfoFromLocalstorage()["email"]
    return this.Email;


  }
  public getauthToken():any{
    this.authToken=Cookie.get('authtoken')
    console.log("Auth token:"+this.authToken)
    return this.authToken;
  }

  public signupFunction(data): Observable<any>{
    const params=new HttpParams()
     .set('Name',data.Name)
     .set('email',data.email)
     .set('password',data.password)

     return this.http.post(`${this.url}/api/v1/users/signup`,params);
  }
  public signinFunction(data): Observable<any>{
    const params=new HttpParams()
    .set('email',data.email)
    .set('password',data.password)

    return this.http.post(`${this.url}/api/v1/users/login`,params);

  }
  public logoutFunction(data):Observable<any>{
    const params=new HttpParams()
    .set('userId',data)
    this.getauthToken()
    return this.http.post(`${this.url}/api/v1/users/logout?authToken=${this.authToken}`,params);
  }
  public raiseIssue(data): Observable<any>{
    this.getauthToken()
    return this.http.post(`${this.url}/api/v1/users/issue?authToken=${this.authToken}`,data);
  }
  public getIssue(useremailId,skip):Observable<any>{
    this.getauthToken()
    const params=new HttpParams()
    .set('email',useremailId)
    .set('authToken',this.authToken)
    

    return this.http.post(`${this.url}/api/v1/users/all/issue?skip=${skip}`,params);

  }
  public searchIssueservice(usersearch,skip):Observable<any>{
    this.getauthToken()
    const params=new HttpParams()
    .set('search',usersearch)
    .set('authToken',this.authToken)

    return this.http.post(`${this.url}/api/v1/users/search?skip=${skip}`,params);

  }

  public viewsingleIssue(IssueId):Observable<any>{
    this.getauthToken()
    let myResposne=this.http.get(this.url+ `/api/v1/users/view` + `/`+IssueId+`?authToken=${this.authToken}`);
    return myResposne;
  }

  public editsingleissue(IssueId,data):Observable<any>{
    this.getauthToken()
    let myResposne=this.http.put(this.url+ `/api/v1/users/edit` + `/`+IssueId+`?authToken=${this.authToken}`,data)
    return myResposne;
  }
  public viewallComments(issueId,skip):Observable<any>{
    console.log(issueId)
    console.log(skip)
    this.getauthToken()
    const params=new HttpParams()
    .set('issueId',issueId)
    .set('authToken',this.authToken)
    
    
    return this.http.post(`${this.url}/api/v1/users/view-comment?skip=${skip}`,params);
  }
  public postComment(comment,issueId,username):Observable<any>{
    this.getauthToken()
    const params=new HttpParams()
    .set('commenttext',comment)
    .set('authToken',this.authToken)
    let myResposne=this.http.post(this.url + '/api/v1/users/comment' + '/'+issueId+'/'+username,params);
    return myResposne;
  }
  public addnewWatcher(data):Observable<any>{
    const params=new HttpParams()
    .set('IssueId',data.IssueId)
    .set('email',data.email)
    return this.http.post(`${this.url}/api/v1/users/addwatcher`,params);
  }
  public viewWatcherUser(IssueId,email):Observable<any>{
    return this.http.get(this.url+ '/api/v1/users/viewwatcher' + '/'+IssueId+'/'+email);
  } 
  
  public resetuserpassword(resetauth,password):Observable<any>{
    const params=new HttpParams()
    .set('password',password)
  return this.http.put(this.url+ '/api/v1/users/reset-password' + '/'+resetauth,params);
  }

  public emailVerify(email):Observable<any>{
    const params=new HttpParams()
    .set('email',email)
  return this.http.post(this.url+ '/api/v1/users/email',params);
  }
}
