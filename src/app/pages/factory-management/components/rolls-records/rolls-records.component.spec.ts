import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollsRecordsComponent } from './rolls-records.component';

describe('RollsRecordsComponent', () => {
  let component: RollsRecordsComponent;
  let fixture: ComponentFixture<RollsRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollsRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollsRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
