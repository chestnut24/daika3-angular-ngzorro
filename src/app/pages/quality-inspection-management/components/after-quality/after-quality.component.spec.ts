import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterQualityComponent } from './after-quality.component';

describe('AfterQualityComponent', () => {
  let component: AfterQualityComponent;
  let fixture: ComponentFixture<AfterQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
