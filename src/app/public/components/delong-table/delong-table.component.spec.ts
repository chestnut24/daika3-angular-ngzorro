import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelongTableComponent } from './delong-table.component';

describe('DelongTableComponent', () => {
  let component: DelongTableComponent;
  let fixture: ComponentFixture<DelongTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelongTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelongTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
