import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingScreen9 } from './loading-screen-9';

describe('LoadingScreen9', () => {
  let component: LoadingScreen9;
  let fixture: ComponentFixture<LoadingScreen9>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreen9]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingScreen9);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
