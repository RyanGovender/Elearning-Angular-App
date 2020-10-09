import { Component, OnInit } from '@angular/core';
import { LearningPathService } from './learning-path.service';
import { LearningPath } from 'src/app/Models/LearningPath';
import { DefaultValues } from 'src/app/Models/DefaultValues';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import {MatSliderModule, MatSliderChange} from '@angular/material/slider';
import { LearningPathAddComponent } from '../learning-path-add/learning-path-add.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LearningPathUpdateComponent } from '../learning-path-update/learning-path-update.component';

@Component({
  selector: 'app-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.css']
})
export class LearningPathComponent implements OnInit {

  
 
  constructor(private _learningPathService:LearningPathService,public dialog: MatDialog,private _snackBar:MatSnackBar) { }


  openDialog() {
    
    this._learningPathService.SetLearningPathEmpty();
    this.dialog.open(LearningPathAddComponent);
    const data = this.dialog.afterAllClosed;
    data.subscribe((value:any)=>{
    if(this._learningPathService.dialogClosed)this.GetAllLearningPath();
    });
    
  }


  LearningPath : LearningPath;
  learningPath : LearningPath;
  AlllearningPaths:any;
  private _defaultFailureStatusCode = 400;
  private _noItemsInArrayMessage = 'No Learning Paths Found.';
  test = true;

  ngOnInit(): void {
    this.GetAllLearningPath();
   
  }

  UpdateDialog(learningPath:LearningPath)
  {
    this._learningPathService.LearingPath = learningPath;
    this.dialog.open(LearningPathUpdateComponent);
    const data = this.dialog.afterAllClosed;
    data.subscribe((value:any)=>{
    if(this._learningPathService.dialogClosed)this.GetAllLearningPath();
    });
  }

  GetAllLearningPath()
  {
    return this._learningPathService.GetAllLearningPath().subscribe(
      (value:any)=>{
        if(value == this._defaultFailureStatusCode) console.log(this._noItemsInArrayMessage);
        else this.AssignLearningPaths(value);
        this._learningPathService.dialogClosed = false;
        this.LearningPath = this.AlllearningPaths[0];
      }
    );
  }

 private AssignLearningPaths(value)
  {
    this.AlllearningPaths = value;
    this._learningPathService.AllLearningPath = value;
  }

  PostLearningPath(learningPath:LearningPath)
  {
    return this._learningPathService.PostLearningPath(learningPath).subscribe(
      (value:any)=>{
        console.log(this.StatusMessage(value,DefaultValues.SuccessullyPost));
        this._learningPathService.openSnackBar('Hi',"close");
      }
    );
  }

  UpdateLearningPath(learningPath:LearningPath)
  {
    // let date = new Date();
    // this.learningPath = {
    //   name:'CHNAGE MEEE PLES',
    //   slug:'IM A uPDATED COURSE',
    //   id:28,
    //   pathIcon:'...HTTPS?',
    //   learningPathDescription:'updated meee',
    //   createdDate:date,
    //   modifiedDate:date,
    //   totalCourses:1
    // }

    return this._learningPathService.UpdateLearningPath(learningPath).subscribe(
      (value:any)=>{
        console.log(this.StatusMessage(value,DefaultValues.SuccessulUpdate));
      }
    );
  }

  DeleteLearningPath(id)
  {
    return this._learningPathService.DeleteLearningPath(id).subscribe(
      (value:any)=>{
        console.log(this.StatusMessage(value,DefaultValues.SuccessfulDelete));
      }
    );
  }

  StatusMessage(value,message)
  {
     return value == this._defaultFailureStatusCode ? 
      DefaultValues.BaseUnsucessfullMessage :
      DefaultValues.BaseSuccessfullMessage+message;
  }

}

