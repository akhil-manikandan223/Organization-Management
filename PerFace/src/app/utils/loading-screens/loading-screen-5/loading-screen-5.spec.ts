import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingScreen5 } from './loading-screen-5';

describe('LoadingScreen5', () => {
  let component: LoadingScreen5;
  let fixture: ComponentFixture<LoadingScreen5>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreen5]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingScreen5);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
