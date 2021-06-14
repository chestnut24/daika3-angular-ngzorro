import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeQualityComponent } from './before-quality.component';

describe('BeforeQualityComponent', () => {
  let component: BeforeQualityComponent;
  let fixture: ComponentFixture<BeforeQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
