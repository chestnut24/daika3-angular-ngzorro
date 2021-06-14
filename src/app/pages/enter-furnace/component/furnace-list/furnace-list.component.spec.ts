import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnaceListComponent } from './furnace-list.component';

describe('FurnaceListComponent', () => {
  let component: FurnaceListComponent;
  let fixture: ComponentFixture<FurnaceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurnaceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
