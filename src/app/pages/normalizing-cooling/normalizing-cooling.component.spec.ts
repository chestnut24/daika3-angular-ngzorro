import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizingCoolingComponent } from './normalizing-cooling.component';

describe('NormalizingCoolingComponent', () => {
  let component: NormalizingCoolingComponent;
  let fixture: ComponentFixture<NormalizingCoolingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalizingCoolingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalizingCoolingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
