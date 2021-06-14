import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatTreatmentHistoryComponent } from './heat-treatment-history.component';

describe('HeatTreatmentHistoryComponent', () => {
  let component: HeatTreatmentHistoryComponent;
  let fixture: ComponentFixture<HeatTreatmentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatTreatmentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatTreatmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
