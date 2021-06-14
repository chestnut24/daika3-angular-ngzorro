import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingPlanResumeComponent } from './charging-plan-resume.component';

describe('ChargingPlanResumeComponent', () => {
  let component: ChargingPlanResumeComponent;
  let fixture: ComponentFixture<ChargingPlanResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargingPlanResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargingPlanResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
