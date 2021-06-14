import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpPassWordComponent } from './up-pass-word.component';

describe('UpPassWordComponent', () => {
  let component: UpPassWordComponent;
  let fixture: ComponentFixture<UpPassWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpPassWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpPassWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
