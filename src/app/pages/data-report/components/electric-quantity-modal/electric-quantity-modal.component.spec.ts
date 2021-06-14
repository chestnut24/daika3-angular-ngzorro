import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricQuantityModalComponent } from './electric-quantity-modal.component';

describe('ElectricQuantityModalComponent', () => {
  let component: ElectricQuantityModalComponent;
  let fixture: ComponentFixture<ElectricQuantityModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricQuantityModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricQuantityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
