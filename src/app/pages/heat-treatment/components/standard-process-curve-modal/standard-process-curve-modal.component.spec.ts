import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardProcessCurveModalComponent } from './standard-process-curve-modal.component';

describe('StandardProcessCurveModalComponent', () => {
  let component: StandardProcessCurveModalComponent;
  let fixture: ComponentFixture<StandardProcessCurveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardProcessCurveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardProcessCurveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
