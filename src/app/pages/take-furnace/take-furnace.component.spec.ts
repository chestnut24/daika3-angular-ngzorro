import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeFurnaceComponent } from './take-furnace.component';

describe('TakeFurnaceComponent', () => {
  let component: TakeFurnaceComponent;
  let fixture: ComponentFixture<TakeFurnaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeFurnaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeFurnaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
