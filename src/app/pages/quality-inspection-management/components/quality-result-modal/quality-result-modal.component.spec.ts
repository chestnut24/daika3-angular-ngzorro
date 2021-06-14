import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityResultModalComponent } from './quality-result-modal.component';

describe('QualityResultModalComponent', () => {
  let component: QualityResultModalComponent;
  let fixture: ComponentFixture<QualityResultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityResultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
