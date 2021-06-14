import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMonitorFormComponent } from './device-monitor-form.component';

describe('DeviceMonitorFormComponent', () => {
  let component: DeviceMonitorFormComponent;
  let fixture: ComponentFixture<DeviceMonitorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMonitorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMonitorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
