import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaUtenteComponent } from './crea-utente.component';

describe('CreaUtenteComponent', () => {
  let component: CreaUtenteComponent;
  let fixture: ComponentFixture<CreaUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaUtenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
