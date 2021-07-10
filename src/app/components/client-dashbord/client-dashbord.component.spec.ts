import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDashbordComponent } from './client-dashbord.component';

describe('ClientDashbordComponent', () => {
  let component: ClientDashbordComponent;
  let fixture: ComponentFixture<ClientDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDashbordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
