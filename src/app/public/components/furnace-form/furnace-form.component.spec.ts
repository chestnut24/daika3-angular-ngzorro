import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnaceFormComponent } from './furnace-form.component';

describe('FurnaceFormComponent', () => {
  let component: FurnaceFormComponent;
  let fixture: ComponentFixture<FurnaceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurnaceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
