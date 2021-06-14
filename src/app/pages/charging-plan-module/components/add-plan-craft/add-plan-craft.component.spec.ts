import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanCraftComponent } from './add-plan-craft.component';

describe('AddPlanCraftComponent', () => {
  let component: AddPlanCraftComponent;
  let fixture: ComponentFixture<AddPlanCraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanCraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanCraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
