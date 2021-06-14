import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingScheduleComponent } from './charging-schedule.component';

describe('ChargingScheduleComponent', () => {
  let component: ChargingScheduleComponent;
  let fixture: ComponentFixture<ChargingScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargingScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
