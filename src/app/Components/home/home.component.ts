import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor(private jwtHelper : JwtHelperService, private router : Router) { }

  isUserAuthenticated(){
    const token: string = localStorage.getItem("jwt");
   
    return token && !this.jwtHelper.isTokenExpired(token)? true : false;
  }

  public logOut = () =>{
    localStorage.removeItem("jwt");
  }
  
 
}
