import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterSelfTestComponent } from './after-self-test.component';

describe('AfterSelfTestComponent', () => {
  let component: AfterSelfTestComponent;
  let fixture: ComponentFixture<AfterSelfTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterSelfTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterSelfTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
