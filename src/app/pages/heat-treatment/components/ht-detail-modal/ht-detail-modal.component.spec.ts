import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtDetailModalComponent } from './ht-detail-modal.component';

describe('HtDetailModalComponent', () => {
  let component: HtDetailModalComponent;
  let fixture: ComponentFixture<HtDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
