import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizingCoolingResumeComponent } from './normalizing-cooling-resume.component';

describe('NormalizingCoolingResumeComponent', () => {
  let component: NormalizingCoolingResumeComponent;
  let fixture: ComponentFixture<NormalizingCoolingResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalizingCoolingResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalizingCoolingResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
