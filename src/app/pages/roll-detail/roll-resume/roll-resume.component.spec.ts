import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollResumeComponent } from './roll-resume.component';

describe('RollResumeComponent', () => {
  let component: RollResumeComponent;
  let fixture: ComponentFixture<RollResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
