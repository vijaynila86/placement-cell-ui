import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UserLogin } from '../model/UserLogin';
import { Message } from '../model/Message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  users: UserLogin[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.users.push(new UserLogin("admin111", "admin1@123"));
    this.users.push(new UserLogin("admin222", "admin2@123"));
    this.users.push(new UserLogin("admin333", "admin3@123"));
  }


  getHostURL(): string {
    return environment.apiHost;
  }
  adminLogin(userLogin: UserLogin):Observable<Message>|Observable<any>{
    const url= this.getHostURL()+"/admin-login";
    return this.http.post(url,userLogin, {responseType: 'text'}).pipe(
      tap(data => console.log("Response : "+data)),
      catchError(this.handleError)
    );  
    // let temp = this.users.filter(user => user.username===userLogin.username && user.password===userLogin.password)[0];
    
    // if(temp==undefined){
    //   return throwError("Invalid username or password");
    // }
    // return Observable.create(observer => {
    //   observer.next(temp);
    //   //call complete if you want to close this stream (like a promise)
    //   observer.complete();
    // });  
  }

  private handleError(err: HttpErrorResponse) {

    console.log(err);
    let errorMessage = '';

    if (err.error instanceof Error) {
      console.log("Network Error: " + err.error.message);
      errorMessage = err.error.message;
    }

    else if (err.statusText == "Unknown Error") {
      console.log("Unknown Error: " + err.statusText);
      errorMessage = "Unable to connect to the server";
    }
    else {
      console.log("Backend Error: " + err.error.message);
      errorMessage = err.error.message;
    }

    return throwError(errorMessage);
  }

  submitAddCompanyRequest(payload) {
    return this.http.post(this.getHostURL()+'/company/create', payload);
  }

  submitAddDriveRequest(payload) {
    return this.http.post(this.getHostURL()+'/drive/create', payload);
  }

  submitAddPlacementRequest(payload) {
    return this.http.post(this.getHostURL()+'/admin/create-placement-record/', payload);
  }

  getStudentlist(){
    return this.http.get(this.getHostURL()+'/students/list');
  }

  getDriveList(){
    return this.http.get(this.getHostURL()+'/drive/list');

  }

  fetchCompanyList(){
    return this.http.get(this.getHostURL()+"/company/list");
  }
}