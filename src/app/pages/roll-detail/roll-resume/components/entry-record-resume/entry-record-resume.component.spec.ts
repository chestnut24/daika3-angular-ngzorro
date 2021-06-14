import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryRecordResumeComponent } from './entry-record-resume.component';

describe('EntryRecordResumeComponent', () => {
  let component: EntryRecordResumeComponent;
  let fixture: ComponentFixture<EntryRecordResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryRecordResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryRecordResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
