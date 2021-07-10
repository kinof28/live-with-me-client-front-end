import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDeadArticlesComponent } from './my-dead-articles.component';

describe('MyDeadArticlesComponent', () => {
  let component: MyDeadArticlesComponent;
  let fixture: ComponentFixture<MyDeadArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDeadArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDeadArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
