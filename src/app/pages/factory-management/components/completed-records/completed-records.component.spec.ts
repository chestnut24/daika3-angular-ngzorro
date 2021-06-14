import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedRecordsComponent } from './completed-records.component';

describe('CompletedRecordsComponent', () => {
  let component: CompletedRecordsComponent;
  let fixture: ComponentFixture<CompletedRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
