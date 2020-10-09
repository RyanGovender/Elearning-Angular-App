import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPathUpdateComponent } from './learning-path-update.component';

describe('LearningPathUpdateComponent', () => {
  let component: LearningPathUpdateComponent;
  let fixture: ComponentFixture<LearningPathUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningPathUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningPathUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
