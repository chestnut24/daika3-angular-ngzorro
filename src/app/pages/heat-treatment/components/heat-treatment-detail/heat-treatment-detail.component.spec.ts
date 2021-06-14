import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatTreatmentDetailComponent } from './heat-treatment-detail.component';

describe('HeatTreatmentDetailComponent', () => {
  let component: HeatTreatmentDetailComponent;
  let fixture: ComponentFixture<HeatTreatmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatTreatmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatTreatmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
