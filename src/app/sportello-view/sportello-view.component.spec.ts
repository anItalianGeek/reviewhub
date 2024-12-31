import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportelloViewComponent } from './sportello-view.component';

describe('SportelloViewComponent', () => {
  let component: SportelloViewComponent;
  let fixture: ComponentFixture<SportelloViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportelloViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportelloViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
