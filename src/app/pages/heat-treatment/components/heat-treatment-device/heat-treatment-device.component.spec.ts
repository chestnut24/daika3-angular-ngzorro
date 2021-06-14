import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatTreatmentDeviceComponent } from './heat-treatment-device.component';

describe('HeatTreatmentDeviceComponent', () => {
  let component: HeatTreatmentDeviceComponent;
  let fixture: ComponentFixture<HeatTreatmentDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatTreatmentDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatTreatmentDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
