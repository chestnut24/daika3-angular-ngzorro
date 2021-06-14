import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMonitorManagementComponent } from './device-monitor-management.component';

describe('DeviceMonitorManagementComponent', () => {
  let component: DeviceMonitorManagementComponent;
  let fixture: ComponentFixture<DeviceMonitorManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMonitorManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMonitorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
