import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeHeatTreatmentDetailComponent } from './see-heat-treatment-detail.component';

describe('SeeHeatTreatmentDetailComponent', () => {
  let component: SeeHeatTreatmentDetailComponent;
  let fixture: ComponentFixture<SeeHeatTreatmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeHeatTreatmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeHeatTreatmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
