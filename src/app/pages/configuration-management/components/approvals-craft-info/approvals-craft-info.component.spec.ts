import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsCraftInfoComponent } from './approvals-craft-info.component';

describe('ApprovalsCraftInfoComponent', () => {
  let component: ApprovalsCraftInfoComponent;
  let fixture: ComponentFixture<ApprovalsCraftInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalsCraftInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalsCraftInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
