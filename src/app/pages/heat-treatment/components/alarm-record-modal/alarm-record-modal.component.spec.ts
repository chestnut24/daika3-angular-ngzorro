import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmRecordModalComponent } from './alarm-record-modal.component';

describe('AlarmRecordModalComponent', () => {
  let component: AlarmRecordModalComponent;
  let fixture: ComponentFixture<AlarmRecordModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmRecordModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmRecordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
