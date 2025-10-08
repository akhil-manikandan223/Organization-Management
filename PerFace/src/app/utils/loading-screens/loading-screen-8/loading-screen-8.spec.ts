import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingScreen8 } from './loading-screen-8';

describe('LoadingScreen8', () => {
  let component: LoadingScreen8;
  let fixture: ComponentFixture<LoadingScreen8>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreen8]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingScreen8);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
