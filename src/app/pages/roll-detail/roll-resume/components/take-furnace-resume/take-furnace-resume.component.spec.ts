import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeFurnaceResumeComponent } from './take-furnace-resume.component';

describe('TakeFurnaceResumeComponent', () => {
  let component: TakeFurnaceResumeComponent;
  let fixture: ComponentFixture<TakeFurnaceResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeFurnaceResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeFurnaceResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
