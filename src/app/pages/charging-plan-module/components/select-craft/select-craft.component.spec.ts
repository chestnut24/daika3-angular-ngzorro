import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCraftComponent } from './select-craft.component';

describe('SelectCraftComponent', () => {
  let component: SelectCraftComponent;
  let fixture: ComponentFixture<SelectCraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
