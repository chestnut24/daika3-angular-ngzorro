import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InProductionDataComponent } from './in-production-data.component';

describe('InProductionDataComponent', () => {
  let component: InProductionDataComponent;
  let fixture: ComponentFixture<InProductionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InProductionDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProductionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
