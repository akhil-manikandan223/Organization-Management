import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingScreen6 } from './loading-screen-6';

describe('LoadingScreen6', () => {
  let component: LoadingScreen6;
  let fixture: ComponentFixture<LoadingScreen6>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreen6]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingScreen6);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
