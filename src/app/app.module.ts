import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormGroup, FormControl } from '@angular/forms';
import {
  MatInputModule,
} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import { LearningPathComponent } from './Components/learning-path/learning-path.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import {DemoMaterialModule} from './angular-material.module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus,faFilm,faPencilAlt,faLink,faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import{MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import { LearningPathAddComponent } from './Components/learning-path-add/learning-path-add.component';
import { LearningPathUpdateComponent } from './Components/learning-path-update/learning-path-update.component';
import { MyLoaderComponent } from './Components/Spinner/components/my-loader/my-loader.component';
import { LoaderService } from './Services/services/loader.service';
import { LoaderInterceptorService } from './Services/interceptors/loader-interceptor.service';
import { LearningPathHomeComponent } from './Components/learning-path-home/learning-path-home.component';
import {NavbarComponent} from './Components/navbar/navbar.component';
import{HeroimageComponent} from './Components/heroimage/heroimage.component';
import {AllCoursesComponent} from './Components/Courses/all-courses/all-courses.component';
import{AddCourseComponent} from './Components/Courses/add-course/add-course.component';
import{GetUsersComponent} from './Components/Users/get-users/get-users.component';
import {AddUserComponent} from './Components/Users/add-user/add-user.component';
import {CloudUploadComponent} from './Components/cloudinary/cloud-upload/cloud-upload.component';
import{ScriptComponent} from './Components/script/script.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoginComponent} from './Components/login/login.component';
import {JwtModule,JWT_OPTIONS } from '@auth0/angular-jwt'
import {AuthGuardService} from './Services/guards/auth-guard.service';
import {HomeComponent} from './Components/home/home.component';
import { from } from 'rxjs';
import { QuillModule } from 'ngx-quill';
import {CourseHomeComponent} from './Components/Courses/course-home/course-home.component';

export function tokenGetter()
{
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LearningPathComponent,
    LearningPathAddComponent,
    LearningPathUpdateComponent,
    MyLoaderComponent,
    LearningPathHomeComponent,
    NavbarComponent,
    HeroimageComponent,
    AllCoursesComponent,
    AddCourseComponent,
    GetUsersComponent,
    AddUserComponent,
    CloudUploadComponent,
    ScriptComponent,
    LoginComponent,
    HomeComponent,
    CourseHomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatCardModule,
    FontAwesomeModule,
    DemoMaterialModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains:["localhost:44355"],
        blacklistedRoutes:[]
      }
    }),
    QuillModule.forRoot()
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    AuthGuardService,
    LoaderService,
    {provide:HTTP_INTERCEPTORS, useClass:LoaderInterceptorService,multi:true},
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary){
    library.addIcons(faPlus,faFilm,faPencilAlt,faLink,faUserGraduate);
  }
}
