import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeSelfTestComponent } from './before-self-test.component';

describe('BeforeSelfTestComponent', () => {
  let component: BeforeSelfTestComponent;
  let fixture: ComponentFixture<BeforeSelfTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeSelfTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeSelfTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
