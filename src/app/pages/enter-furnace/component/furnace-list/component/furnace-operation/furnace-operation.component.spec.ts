import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnaceOperationComponent } from './furnace-operation.component';

describe('FurnaceOperationComponent', () => {
  let component: FurnaceOperationComponent;
  let fixture: ComponentFixture<FurnaceOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurnaceOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnaceOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
