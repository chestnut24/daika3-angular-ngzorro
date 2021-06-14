import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostAccountingDataComponent } from './cost-accounting-data.component';

describe('CostAccountingDataComponent', () => {
  let component: CostAccountingDataComponent;
  let fixture: ComponentFixture<CostAccountingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostAccountingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostAccountingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
