import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _baseUrl = `${environment.baseUrl}Auth/`;
  constructor(private _http:HttpClient) { }

  UserLogin(Login)
  {
    Login = JSON.stringify(Login);
    return this._http.post(`${this._baseUrl}Login/`,Login,{
      headers:new HttpHeaders({
        "Content-Type":"application/json"
      })}).pipe(
        catchError(this.handleError)
      );;
  }

  handleError(error: HttpErrorResponse){
    return of(error.error);
  }
}
