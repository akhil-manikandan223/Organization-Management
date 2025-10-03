import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingScreen4 } from './loading-screen-4';

describe('LoadingScreen4', () => {
  let component: LoadingScreen4;
  let fixture: ComponentFixture<LoadingScreen4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreen4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingScreen4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
