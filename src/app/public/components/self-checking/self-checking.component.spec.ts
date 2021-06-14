import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfCheckingComponent } from './self-checking.component';

describe('SelfCheckingComponent', () => {
  let component: SelfCheckingComponent;
  let fixture: ComponentFixture<SelfCheckingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfCheckingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfCheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
