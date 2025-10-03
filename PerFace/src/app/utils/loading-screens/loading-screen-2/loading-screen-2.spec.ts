import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingScreen2 } from './loading-screen-2';

describe('LoadingScreen2', () => {
  let component: LoadingScreen2;
  let fixture: ComponentFixture<LoadingScreen2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreen2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingScreen2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
