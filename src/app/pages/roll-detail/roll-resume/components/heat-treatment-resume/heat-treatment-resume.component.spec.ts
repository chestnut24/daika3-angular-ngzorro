import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatTreatmentResumeComponent } from './heat-treatment-resume.component';

describe('HeatTreatmentResumeComponent', () => {
  let component: HeatTreatmentResumeComponent;
  let fixture: ComponentFixture<HeatTreatmentResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatTreatmentResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatTreatmentResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
