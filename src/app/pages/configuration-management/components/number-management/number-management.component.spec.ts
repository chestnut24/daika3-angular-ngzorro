import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberManagementComponent } from './number-management.component';

describe('NumberManagementComponent', () => {
  let component: NumberManagementComponent;
  let fixture: ComponentFixture<NumberManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
