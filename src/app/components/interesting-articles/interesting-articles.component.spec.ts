import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestingArticlesComponent } from './interesting-articles.component';

describe('InterestingArticlesComponent', () => {
  let component: InterestingArticlesComponent;
  let fixture: ComponentFixture<InterestingArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestingArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestingArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
