import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {

  constructor(private http: HttpClient) { }

  UserLearn: string [];

  //What users will learn array

  InsertIntoUserLearnArray(item: string): void
  {
      this.UserLearn.push(item);
  }


}
