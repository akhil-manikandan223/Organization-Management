import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingScreen3 } from './loading-screen-3';

describe('LoadingScreen3', () => {
  let component: LoadingScreen3;
  let fixture: ComponentFixture<LoadingScreen3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreen3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingScreen3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
