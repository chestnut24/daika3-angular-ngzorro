import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftManagementComponent } from './craft-management.component';

describe('CraftManagementComponent', () => {
  let component: CraftManagementComponent;
  let fixture: ComponentFixture<CraftManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraftManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraftManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
