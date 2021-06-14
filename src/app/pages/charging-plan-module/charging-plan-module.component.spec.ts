import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingPlanModuleComponent } from './charging-plan-module.component';

describe('ChargingPlanModuleComponent', () => {
  let component: ChargingPlanModuleComponent;
  let fixture: ComponentFixture<ChargingPlanModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargingPlanModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargingPlanModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
