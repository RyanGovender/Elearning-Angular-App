import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningPathHomeComponent } from './Components/learning-path-home/learning-path-home.component';
import { LearningPathComponent } from './Components/learning-path/learning-path.component';
import {GetUsersComponent} from './Components/Users/get-users/get-users.component';
import { LoginComponent } from './Components/login/login.component';
import {AuthGuardService} from './Services/guards/auth-guard.service';
import { HomeComponent } from './Components/home/home.component';
import { AddCourseComponent } from './Components/Courses/add-course/add-course.component';
import { CourseHomeComponent } from './Components/Courses/course-home/course-home.component';

const routes: Routes = [
  {path: 'learningpath/:id/:name', component:LearningPathHomeComponent},
  {path: 'Home', component:HomeComponent},
  {path:'Users',component:GetUsersComponent, canActivate:[AuthGuardService]},
  {path:'login',component:LoginComponent},
  {path:'learningpath/:id/:name/create-course',component:AddCourseComponent},
  {path:'learningpath/:id/:name/courseNameHere',component:CourseHomeComponent},
  {path:'', redirectTo: '/Home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
