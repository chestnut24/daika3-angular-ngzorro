import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeQualityResumeComponent } from './before-quality-resume.component';

describe('BeforeQualityResumeComponent', () => {
  let component: BeforeQualityResumeComponent;
  let fixture: ComponentFixture<BeforeQualityResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeQualityResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeQualityResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
