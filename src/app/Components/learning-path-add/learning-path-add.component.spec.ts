import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPathAddComponent } from './learning-path-add.component';

describe('LearningPathAddComponent', () => {
  let component: LearningPathAddComponent;
  let fixture: ComponentFixture<LearningPathAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningPathAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningPathAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
