import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanInfoMsgComponent } from './plan-info-msg.component';

describe('PlanInfoMsgComponent', () => {
  let component: PlanInfoMsgComponent;
  let fixture: ComponentFixture<PlanInfoMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanInfoMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanInfoMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
