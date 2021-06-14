import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QimSearchParamsComponent } from './qim-search-params.component';

describe('QimSearchParamsComponent', () => {
  let component: QimSearchParamsComponent;
  let fixture: ComponentFixture<QimSearchParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QimSearchParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QimSearchParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
