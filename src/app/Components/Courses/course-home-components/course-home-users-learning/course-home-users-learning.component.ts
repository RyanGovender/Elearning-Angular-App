import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../../course-service.service';

@Component({
  selector: 'app-course-home-users-learning',
  templateUrl: './course-home-users-learning.component.html',
  styleUrls: ['./course-home-users-learning.component.css']
})
export class CourseHomeUsersLearningComponent implements OnInit {

  userLearning: string[];
  constructor(private courseService: CourseServiceService) { }

  ngOnInit(): void {
    this.getAllUserLearning();
  }

  getAllUserLearning(): void
  {
     this.userLearning = this.courseService.UserLearn;
  }

  insertIntoArray(item: string): void
  {
      this.courseService.InsertIntoUserLearnArray(item);
      this.getAllUserLearning();
  }

}
