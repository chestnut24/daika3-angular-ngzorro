import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCraftComponent } from './add-craft.component';

describe('AddCraftComponent', () => {
  let component: AddCraftComponent;
  let fixture: ComponentFixture<AddCraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
