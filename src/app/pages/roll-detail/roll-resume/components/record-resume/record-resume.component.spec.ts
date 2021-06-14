import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordResumeComponent } from './record-resume.component';

describe('RecordResumeComponent', () => {
  let component: RecordResumeComponent;
  let fixture: ComponentFixture<RecordResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
