import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollDetailFormComponent } from './roll-detail-form.component';

describe('RollDetailFormComponent', () => {
  let component: RollDetailFormComponent;
  let fixture: ComponentFixture<RollDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
