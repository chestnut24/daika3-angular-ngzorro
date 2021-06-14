import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTransferComponent } from './route-transfer.component';

describe('RouteTransferComponent', () => {
  let component: RouteTransferComponent;
  let fixture: ComponentFixture<RouteTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
