import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseHomeUsersLearningComponent } from './course-home-users-learning.component';

describe('CourseHomeUsersLearningComponent', () => {
  let component: CourseHomeUsersLearningComponent;
  let fixture: ComponentFixture<CourseHomeUsersLearningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseHomeUsersLearningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseHomeUsersLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
