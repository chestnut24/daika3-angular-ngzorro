import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeatTreatmentRollComponent } from './add-heat-treatment-roll.component';

describe('AddHeatTreatmentRollComponent', () => {
  let component: AddHeatTreatmentRollComponent;
  let fixture: ComponentFixture<AddHeatTreatmentRollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHeatTreatmentRollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHeatTreatmentRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
