import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftShowModalComponent } from './craft-show-modal.component';

describe('CraftShowModalComponent', () => {
  let component: CraftShowModalComponent;
  let fixture: ComponentFixture<CraftShowModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraftShowModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraftShowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
