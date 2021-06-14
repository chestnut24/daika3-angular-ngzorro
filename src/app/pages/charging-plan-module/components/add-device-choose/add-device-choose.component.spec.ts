import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceChooseComponent } from './add-device-choose.component';

describe('AddDeviceChooseComponent', () => {
  let component: AddDeviceChooseComponent;
  let fixture: ComponentFixture<AddDeviceChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeviceChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
