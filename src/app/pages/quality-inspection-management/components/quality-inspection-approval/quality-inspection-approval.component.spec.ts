import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityInspectionApprovalComponent } from './quality-inspection-approval.component';

describe('QualityInspectionApprovalComponent', () => {
  let component: QualityInspectionApprovalComponent;
  let fixture: ComponentFixture<QualityInspectionApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityInspectionApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityInspectionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
