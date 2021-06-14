import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatPositionTemperatureComponent } from './heat-position-temperature.component';

describe('HeatPositionTemperatureComponent', () => {
  let component: HeatPositionTemperatureComponent;
  let fixture: ComponentFixture<HeatPositionTemperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatPositionTemperatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatPositionTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
