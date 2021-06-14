import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterUnqualifiedComponent } from './after-unqualified.component';

describe('AfterUnqualifiedComponent', () => {
  let component: AfterUnqualifiedComponent;
  let fixture: ComponentFixture<AfterUnqualifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterUnqualifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterUnqualifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
