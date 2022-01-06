import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseHomeRequirementsComponent } from './course-home-requirements.component';

describe('CourseHomeRequirementsComponent', () => {
  let component: CourseHomeRequirementsComponent;
  let fixture: ComponentFixture<CourseHomeRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseHomeRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseHomeRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
