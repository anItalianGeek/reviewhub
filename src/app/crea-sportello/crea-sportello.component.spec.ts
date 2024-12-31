import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaSportelloComponent } from './crea-sportello.component';

describe('CreaSportelloComponent', () => {
  let component: CreaSportelloComponent;
  let fixture: ComponentFixture<CreaSportelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaSportelloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaSportelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
