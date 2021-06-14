import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCoolingComponent } from './check-cooling.component';

describe('CheckCoolingComponent', () => {
  let component: CheckCoolingComponent;
  let fixture: ComponentFixture<CheckCoolingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckCoolingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCoolingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
