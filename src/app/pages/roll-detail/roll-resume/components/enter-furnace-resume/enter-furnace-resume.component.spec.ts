import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterFurnaceResumeComponent } from './enter-furnace-resume.component';

describe('EnterFurnaceResumeComponent', () => {
  let component: EnterFurnaceResumeComponent;
  let fixture: ComponentFixture<EnterFurnaceResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterFurnaceResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterFurnaceResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
