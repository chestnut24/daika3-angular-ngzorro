import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolingHistoryRecordComponent } from './cooling-history-record.component';

describe('CoolingHistoryRecordComponent', () => {
  let component: CoolingHistoryRecordComponent;
  let fixture: ComponentFixture<CoolingHistoryRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoolingHistoryRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolingHistoryRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
