import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzShowComponentComponent } from './nz-show-component.component';

describe('NzShowComponentComponent', () => {
  let component: NzShowComponentComponent;
  let fixture: ComponentFixture<NzShowComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NzShowComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzShowComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
