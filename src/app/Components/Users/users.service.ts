import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Users } from 'src/app/Models/Users';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SharedMethods } from 'src/app/Models/DefaultValues';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';  
import { by } from 'protractor';
import { Binary } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private _baseUrl =  environment.baseUrl + 'Users/';
  DefaultUser : Users = this.SetEmptyUser();

  constructor(private _http:HttpClient,private _snackBar:MatSnackBar) { }

  SetEmptyUser()
  {
     return this.DefaultUser = {
       id:'',
       email:'',
       name:'',
       surname:'',
       emailConfirmed:false,
       passwordHash:'',
       avatarUrl:'',
       createdDate:SharedMethods.GetDate(),
       modifiedDate:SharedMethods.GetDate()
     };
  }

  GetFormGroup():FormGroup
  {
    return new FormGroup({
      email:new FormControl(this.DefaultUser.email,[Validators.required,Validators.email,Validators.maxLength(256)]),
      name:new FormControl(this.DefaultUser.name,[Validators.required,Validators.maxLength(128)]),
      surname:new FormControl(this.DefaultUser.surname,[Validators.required,Validators.maxLength(128)]),
      passwordHash:new FormControl(this.DefaultUser.name,[Validators.required]),
      avatarUrl:new FormControl(this.DefaultUser.avatarUrl),
    });
  }

  GetUser(formGroup : FormGroup) : Users
  {
    return {
      id:this.DefaultUser.id,
      email:this.GetValueFromForm('email',formGroup),
      name:this.GetValueFromForm('name',formGroup),
      surname:this.GetValueFromForm('surname',formGroup),
      emailConfirmed:this.DefaultUser.emailConfirmed,
      passwordHash:this.tokenHash(formGroup),
      avatarUrl:this.GetValueFromForm('avatarUrl',formGroup),
      createdDate:SharedMethods.GetDate(),
      modifiedDate:SharedMethods.GetDate()
    };
  }

  private tokenHash(formGroup)
  {
    var crpto = CryptoJS.AES.encrypt(this.GetValueFromForm('passwordHash',formGroup),
    this.GetValueFromForm('email',formGroup)).toString();
    var x =this.decryptToken(formGroup,crpto);
    console.log('dkasd sakd',x)
    return crpto;
  }

  private decryptToken(formGroup, text)
  {
   
     const bytes = CryptoJS.AES.decrypt(text,
    this.GetValueFromForm('email',formGroup));
    console.log(bytes);
    var plainText = bytes.toString(CryptoJS.enc.Utf8);
    console.log('Paasword is',bytes.toString(CryptoJS.enc.Utf8));
    return plainText;
  }

  openSnackBar(message,action)
  {
    this._snackBar.open(message,action, {
      duration:5000,
      horizontalPosition:'center',
      verticalPosition:'top'
    });
  }

  private GetValueFromForm(formControlName:string,formControl:FormGroup)
  {
     return formControl.get(formControlName).value;
  }

  GetAllUsers()
  {
     return this._http.get<Observable<Users[]>>(`${this._baseUrl}`,{
       headers:new HttpHeaders({
         "Content-Type":"application/json"
       })
     })
     .pipe(
      catchError(this.handleError)
    );
  }

  PostUser(users:Users)
  {
    console.log('I am Users ',users);
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(users), 'secret key 123').toString();
    console.log(ciphertext);
    return this._http.post<Users>(`${this._baseUrl}Post`,users)
    .pipe(
      catchError(this.handleError)
    );
  }

  UpdateUser(users:Users)
  {
    return this._http.put<Users>(`${this._baseUrl}Put`,users)
    .pipe(
      catchError(this.handleError)
    );
  }

  DeleteUser(id)
  {
    return this._http.delete<Users>(`${this._baseUrl}Delete?id=${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
    console.log(error);
      return of(error.status);
    }
}
