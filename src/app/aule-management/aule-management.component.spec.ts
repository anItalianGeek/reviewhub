import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuleManagementComponent } from './aule-management.component';

describe('AuleManagementComponent', () => {
  let component: AuleManagementComponent;
  let fixture: ComponentFixture<AuleManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuleManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
