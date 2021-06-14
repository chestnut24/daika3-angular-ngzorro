import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginCoolingComponent } from './begin-cooling.component';

describe('BeginCoolingComponent', () => {
  let component: BeginCoolingComponent;
  let fixture: ComponentFixture<BeginCoolingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginCoolingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginCoolingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
