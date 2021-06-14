import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryRecordComponent } from './entry-record.component';

describe('EntryRecordComponent', () => {
  let component: EntryRecordComponent;
  let fixture: ComponentFixture<EntryRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
