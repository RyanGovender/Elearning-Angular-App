import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/Models/Login';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  invalidLogin = false;
  
  constructor(private _loginService:LoginService,private router: Router) {
    this.CreateFormGroup();
   }

  ngOnInit(): void {
  }

  CreateFormGroup()
  {
    this.form = new FormGroup({

         email: new FormControl('',[Validators.maxLength(256),Validators.required,Validators.email]),
         password: new FormControl('',[Validators.required,Validators.maxLength(128)])
    });
  }

  Logout()
  {
    localStorage.removeItem("jwt");
  }

  Login()
  {
    if(!this.form.valid) return null;
    const login = {
      email:this.form.get('email').value,
      passwordHash:this.form.get('password').value
    };

    this._loginService.UserLogin(login).subscribe(
      (response:any) => {
        const token = (<any>response).token;
        const refreshToken = (<any>response).refreshToken;
        localStorage.setItem("jwt",token);
        localStorage.setItem("refreshToken",refreshToken);
        this.invalidLogin = false;
        console.log(response);
        if(response.code == 200)  this.router.navigate(["Home"]);
       
      }, err =>{
        this.invalidLogin = true;
      }
    )
  }

}
