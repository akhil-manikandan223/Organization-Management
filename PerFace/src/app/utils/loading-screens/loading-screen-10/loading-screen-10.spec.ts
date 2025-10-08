import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingScreen10 } from './loading-screen-10';

describe('LoadingScreen10', () => {
  let component: LoadingScreen10;
  let fixture: ComponentFixture<LoadingScreen10>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreen10]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingScreen10);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
