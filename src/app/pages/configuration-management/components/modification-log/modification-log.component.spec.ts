import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationLogComponent } from './modification-log.component';

describe('ModificationLogComponent', () => {
  let component: ModificationLogComponent;
  let fixture: ComponentFixture<ModificationLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
