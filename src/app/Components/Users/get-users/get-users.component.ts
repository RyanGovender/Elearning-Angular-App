import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { Users } from 'src/app/Models/Users';
import { SharedMethods } from 'src/app/Models/DefaultValues';
import * as CryptoJS from 'crypto-js';  
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit {

  private _defaultFailureStatusCode = 400;
  private _noItemsInArrayMessage = 'No Users Found.';
  AllUsers:any;
  message : string;
  color='primary';
  backgroundColor='primary';
  displayedColumns: string[] = ['email','name','surname','emailConfirmed','avatarUrl','createdDate'];
  dataSource: MatTableDataSource<Users>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _userService: UsersService) {
   }

  ngOnInit(): void {
    this.GetAllUsers();
  }

  GetAllUsers()
  {
        return this._userService.GetAllUsers().subscribe(
          (value:any)=>{
            if(value == this._defaultFailureStatusCode) {
              console.log(this._noItemsInArrayMessage)}
            else {
            this.AllUsers = value;
            this.dataSource = new MatTableDataSource(value);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
           };
          }
        );
  }

  applyFilter(event:Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

 

  PasswordHash():void
  {
    //Password is the key.
    //Hello is the text yoy want to be encrypted.
    //
     var hashedPasssword = CryptoJS.AES.encrypt('Hello','ryangovender@gmail.com').toString();
     var unhashed = CryptoJS.AES.decrypt(hashedPasssword,'ryangovender@gmail.com').toString(CryptoJS.enc.Utf8);
     console.log('Ive been hashed boii',hashedPasssword);
     console.log('Decrypt Me Right Please?',unhashed);
  }

  PostUsers()
  {
    let date = new Date();
  const users = {
    id:'ksa aksbd',
    email:'eyan@gamil.com',
    name:'asdsad',
    surname:'askhbsa',
    emailConfirmed:false,
    passwordHash:'asuoudx saboud',
    avatarUrl:'isadhisadi',
    modifiedDate:SharedMethods.GetDate(),
    createdDate:SharedMethods.GetDate()
  }

  console.log(users);
    return this._userService.PostUser(users).subscribe(
      (value:any)=>{
        console.log(value);
        // this.message =  SharedMethods.GetStatus(value,DefaultValues.SuccessullyPost);
        // this._learningPathService.openSnackBar(this.message,'Close');
        // this.closeDialog(true);
      }
    );
  }
}
