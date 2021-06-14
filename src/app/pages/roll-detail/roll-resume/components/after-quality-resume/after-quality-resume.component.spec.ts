import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterQualityResumeComponent } from './after-quality-resume.component';

describe('AfterQualityResumeComponent', () => {
  let component: AfterQualityResumeComponent;
  let fixture: ComponentFixture<AfterQualityResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterQualityResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterQualityResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
