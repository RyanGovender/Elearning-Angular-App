import { Component, OnInit, Inject, Output,EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LearningPath } from 'src/app/Models/LearningPath';
import { LearningPathService } from '../learning-path/learning-path.service';
import { DefaultValues, SharedMethods } from 'src/app/Models/DefaultValues';


@Component({
  selector: 'app-learning-path-add',
  templateUrl: './learning-path-add.component.html',
  styleUrls: ['./learning-path-add.component.css']
})
export class LearningPathAddComponent implements OnInit {

   fb = new FormBuilder();
   form : FormGroup;
   learningPath : LearningPath;
   message : string;
   src='/assets/defaultPicture.jpeg';
   private defaultName = 'Learning Path Name';
   name = this.defaultName;

  constructor(public dialogRef: MatDialogRef<LearningPathAddComponent>,private _learningPathService:LearningPathService) { 
  this.FormControl();
  }

  ngOnInit(): void {
  }

  FormControl()
  {
     this.form = this._learningPathService.GetFormGroup();
  }

  UpdateImage(event:KeyboardEvent)
  {
     this.src = this._learningPathService.UpdateImageUrl(event);
  }

  UpdateName(event:KeyboardEvent)
  {
    this.name = this._learningPathService.UpdateName(event);
  }

  Add()
  {
   (this.form.valid)?
    this.PostLearningPath(this._learningPathService.GetLearningPath(this.form)): 
    this._learningPathService.openSnackBar(DefaultValues.RequiredFields,'Close');
  }

  PostLearningPath(learningPath:LearningPath)
  {
    return this._learningPathService.PostLearningPath(learningPath).subscribe(
      (value:any)=>{
        this.message =  SharedMethods.GetStatus(value,DefaultValues.SuccessullyPost);
        this._learningPathService.openSnackBar(this.message,'Close');
        this.closeDialog(true);
      }
    );
  }

  closeDialog(GetCallBool:boolean):void
  {
    if(GetCallBool)this._learningPathService.dialogClosed = true;
    this.dialogRef.close();
  }


}
