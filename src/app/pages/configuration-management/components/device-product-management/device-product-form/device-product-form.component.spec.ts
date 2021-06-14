import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceProductFormComponent } from './device-product-form.component';

describe('DeviceProductFormComponent', () => {
  let component: DeviceProductFormComponent;
  let fixture: ComponentFixture<DeviceProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
