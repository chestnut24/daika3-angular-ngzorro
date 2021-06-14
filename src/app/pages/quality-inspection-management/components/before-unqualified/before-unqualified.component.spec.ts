import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeUnqualifiedComponent } from './before-unqualified.component';

describe('BeforeUnqualifiedComponent', () => {
  let component: BeforeUnqualifiedComponent;
  let fixture: ComponentFixture<BeforeUnqualifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeUnqualifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeUnqualifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
