import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterieManagementComponent } from './materie-management.component';

describe('MaterieManagementComponent', () => {
  let component: MaterieManagementComponent;
  let fixture: ComponentFixture<MaterieManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterieManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterieManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
