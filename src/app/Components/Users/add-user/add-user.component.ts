import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Users } from 'src/app/Models/Users';
import { SharedMethods, DefaultValues } from 'src/app/Models/DefaultValues';
import { UsersService } from '../users.service';
import { AnyAaaaRecord } from 'dns';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  fb = new FormBuilder();
  form : FormGroup;
  user : Users;
  message : string;
  temp:string = '';
  _flag = false;
  src='/assets/defaultPicture.jpeg';
  constructor(private _userService:UsersService) {
    this.FormControl();
   }

  ngOnInit(): void {
  
  }

  FormControl()
  {
     this.form = this._userService.GetFormGroup();
  }

  UpdateImage(event:KeyboardEvent)
  {
     //this.src = this._userService.UpdateImageUrl(event);
  }

  Add()
  {
    if(this._flag) return this._userService.openSnackBar('Passwords Do Not Match','Close');
   (this.form.valid)?
    this.AddUser(this._userService.GetUser(this.form)): 
    this._userService.openSnackBar(DefaultValues.RequiredFields,'Close');
  }

  checkPassword()
  {
    var token = this.form.get('passwordHash').value;
    if(this.temp!='')
    token!=this.temp?this._flag=true:this._flag = false;
  }

  checkPasswords(event:KeyboardEvent)
  {
     this.temp = (event.target as HTMLInputElement).value;
     var password = this.form.get('passwordHash').value;
     this.temp!=password?this._flag = true:this._flag = false;
  }


  AddUser(user:Users)
  {
    return this._userService.PostUser(user).subscribe(
      (value:any)=>{
        console.log(value);
        this.message =  SharedMethods.GetStatus(value,DefaultValues.SuccessullyPost);
        this._userService.openSnackBar(this.message,'Close');
      }
    );
  }

}
