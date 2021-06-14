import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftApprovalsComponent } from './craft-approvals.component';

describe('CraftApprovalsComponent', () => {
  let component: CraftApprovalsComponent;
  let fixture: ComponentFixture<CraftApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraftApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraftApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
