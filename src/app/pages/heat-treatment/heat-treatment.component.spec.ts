import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatTreatmentComponent } from './heat-treatment.component';

describe('HeatTreatmentComponent', () => {
  let component: HeatTreatmentComponent;
  let fixture: ComponentFixture<HeatTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
