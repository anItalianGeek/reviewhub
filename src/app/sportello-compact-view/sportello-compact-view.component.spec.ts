import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportelloCompactViewComponent } from './sportello-compact-view.component';

describe('SportelloCompactViewComponent', () => {
  let component: SportelloCompactViewComponent;
  let fixture: ComponentFixture<SportelloCompactViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportelloCompactViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportelloCompactViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
