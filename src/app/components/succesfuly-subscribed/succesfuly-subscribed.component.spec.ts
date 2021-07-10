import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesfulySubscribedComponent } from './succesfuly-subscribed.component';

describe('SuccesfulySubscribedComponent', () => {
  let component: SuccesfulySubscribedComponent;
  let fixture: ComponentFixture<SuccesfulySubscribedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccesfulySubscribedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesfulySubscribedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
