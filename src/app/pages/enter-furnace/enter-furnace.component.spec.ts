import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterFurnaceComponent } from './enter-furnace.component';

describe('EnterFurnaceComponent', () => {
  let component: EnterFurnaceComponent;
  let fixture: ComponentFixture<EnterFurnaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterFurnaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterFurnaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
