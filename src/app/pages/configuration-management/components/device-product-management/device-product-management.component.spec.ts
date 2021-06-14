import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceProductManagementComponent } from './device-product-management.component';

describe('DeviceProductManagementComponent', () => {
  let component: DeviceProductManagementComponent;
  let fixture: ComponentFixture<DeviceProductManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceProductManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
