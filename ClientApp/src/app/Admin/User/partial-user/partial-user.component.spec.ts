import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialUserComponent } from './partial-user.component';

describe('PartialUserComponent', () => {
  let component: PartialUserComponent;
  let fixture: ComponentFixture<PartialUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
