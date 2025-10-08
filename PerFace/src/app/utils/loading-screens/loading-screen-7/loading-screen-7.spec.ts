import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingScreen7 } from './loading-screen-7';

describe('LoadingScreen7', () => {
  let component: LoadingScreen7;
  let fixture: ComponentFixture<LoadingScreen7>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreen7]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingScreen7);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
