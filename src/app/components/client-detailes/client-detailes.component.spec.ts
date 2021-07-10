import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailesComponent } from './client-detailes.component';

describe('ClientDetailesComponent', () => {
  let component: ClientDetailesComponent;
  let fixture: ComponentFixture<ClientDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDetailesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
