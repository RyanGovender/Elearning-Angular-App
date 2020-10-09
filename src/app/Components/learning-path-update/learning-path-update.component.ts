import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LearningPath } from 'src/app/Models/LearningPath';
import { LearningPathService } from '../learning-path/learning-path.service';
import { SharedMethods, DefaultValues } from 'src/app/Models/DefaultValues';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-learning-path-update',
  templateUrl: './learning-path-update.component.html',
  styleUrls: ['./learning-path-update.component.css']
})
export class LearningPathUpdateComponent implements OnInit {

  form : FormGroup;
  message:string;
  src='/assets/defaultPicture.jpeg';
  private defaultName = 'Learning Path Name';
  name = this.defaultName;


  constructor(public _learningPathService:LearningPathService,
    public dialogRef: MatDialogRef<LearningPathUpdateComponent>) { 
    this.FormControl();
  }
 
  ngOnInit(): void {
  }

  closeDialog(GetCallBool:boolean):void
  {
    if(GetCallBool)this._learningPathService.dialogClosed = true;
    this.dialogRef.close();
  }

  FormControl()
  {
    this.form = this._learningPathService.GetFormGroup();
    this.src =  this.form.get('url').value;
    this.name = this.form.get('name').value;
  }

  UpdateImage(event:KeyboardEvent)
  {
     this.src = this._learningPathService.UpdateImageUrl(event)
  }

  UpdateName(event:KeyboardEvent)
  {
    this.name = this._learningPathService.UpdateName(event);
  }

  Update()
  {
      this.form.valid?
      this.UpdateLearningPath(this._learningPathService.GetLearningPath(this.form)):
      this._learningPathService.openSnackBar(DefaultValues.RequiredFields,'Close');
  }

 UpdateLearningPath(learningPath:LearningPath)
  {
    return this._learningPathService.UpdateLearningPath(learningPath).subscribe(
      (value:any)=>{
        this.message =  SharedMethods.GetStatus(value,DefaultValues.SuccessulUpdate);
        this._learningPathService.openSnackBar(this.message,'Close');
        this.closeDialog(true);
      }
    );
  }

}
