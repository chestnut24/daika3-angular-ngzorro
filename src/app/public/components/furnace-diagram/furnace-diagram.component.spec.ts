import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnaceDiagramComponent } from './furnace-diagram.component';

describe('FurnaceDiagramComponent', () => {
  let component: FurnaceDiagramComponent;
  let fixture: ComponentFixture<FurnaceDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurnaceDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnaceDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
