import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollDetailComponent } from './roll-detail.component';

describe('RollDetailComponent', () => {
  let component: RollDetailComponent;
  let fixture: ComponentFixture<RollDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
