import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from'rxjs/operators';
import { LearningPath } from 'src/app/Models/LearningPath';
import {MatSnackBar} from '@angular/material/snack-bar'; 
import { LearningPathUpdateComponent } from '../learning-path-update/learning-path-update.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedMethods } from 'src/app/Models/DefaultValues';


@Injectable({
  providedIn: 'root'
})
export class LearningPathService {

  private baseUrl = environment.baseUrl + 'LearningPath/';
  dialogClosed = false;
  LearingPath: LearningPath = this.SetLearningPathEmpty();
  private defaultName = 'Learning Path Name';
  private name = this.defaultName;
  AllLearningPath:any;
  
  constructor(private _http:HttpClient,private _snackBar:MatSnackBar) { }

  SetLearningPathEmpty():LearningPath
  {
    return this.LearingPath = {
      name:'',
      slug:'',
      id:0,
      pathIcon:'',
      learningPathDescription:'',
      createdDate:SharedMethods.GetDate(),
      modifiedDate:SharedMethods.GetDate(),
      totalCourses:0
    }
  }

  GetFormGroup():FormGroup
  {
    return new FormGroup({
      name:new FormControl(this.LearingPath.name,[Validators.required,Validators.maxLength(256)]),
      longDescription: new FormControl(this.LearingPath.learningPathDescription,[Validators.required]),
      slug:new FormControl(this.LearingPath.slug,[Validators.maxLength(256)]),
      url:new FormControl(this.LearingPath.pathIcon,[])
    });
  }

 GetLearningPath(formControl:FormGroup) : LearningPath
  {
      return {
          name:this.GetValueFromForm('name',formControl),
          slug:this.GetValueFromForm('slug',formControl),
          id:this.LearingPath.id,
          pathIcon:this.GetValueFromForm('url',formControl),
          learningPathDescription:this.GetValueFromForm('longDescription',formControl),
          createdDate:SharedMethods.GetDate(),
          modifiedDate:SharedMethods.GetDate(),
          totalCourses: this.LearingPath.totalCourses
      }
  }

  private GetValueFromForm(formControlName:string,formControl:FormGroup)
  {
     return formControl.get(formControlName).value;
  }

  openSnackBar(message,action)
  {
    this._snackBar.open(message,action, {
      duration:5000,
      horizontalPosition:'center',
      verticalPosition:'top'
    });
  }

  UpdateName(event:KeyboardEvent) : string
  {
    var name = (event.target as HTMLInputElement).value;
    return name==''?
    this.name = this.defaultName:
    this.name = name;
  }

  UpdateImageUrl(event:KeyboardEvent) : string
  {
     return (event.target as HTMLInputElement).value;
  }


  GetAllLearningPath()
  {
     return this._http.get<Observable<LearningPath[]>>(`${this.baseUrl}`)
     .pipe(
      catchError(this.handleError)
    );
  }

  PostLearningPath(learningPath:LearningPath)
  {
    return this._http.post<LearningPath>(`${this.baseUrl}Post`,learningPath)
    .pipe(
      catchError(this.handleError)
    );
  }

  UpdateLearningPath(learningPath:LearningPath)
  {
    return this._http.put<LearningPath>(`${this.baseUrl}Put`,learningPath)
    .pipe(
      catchError(this.handleError)
    );
  }

  DeleteLearningPath(id)
  {
    return this._http.delete<LearningPath>(`${this.baseUrl}Delete?id=${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
      return of(error.status);
    }
  

}
