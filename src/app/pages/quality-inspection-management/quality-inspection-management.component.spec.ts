import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityInspectionManagementComponent } from './quality-inspection-management.component';

describe('QualityInspectionManagementComponent', () => {
  let component: QualityInspectionManagementComponent;
  let fixture: ComponentFixture<QualityInspectionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityInspectionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityInspectionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
