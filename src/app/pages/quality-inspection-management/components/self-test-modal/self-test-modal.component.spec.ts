import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfTestModalComponent } from './self-test-modal.component';

describe('SelfTestModalComponent', () => {
  let component: SelfTestModalComponent;
  let fixture: ComponentFixture<SelfTestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfTestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfTestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
