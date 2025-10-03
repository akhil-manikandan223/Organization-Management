import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingScreen1 } from './loading-screen-1';

describe('LoadingScreen1', () => {
  let component: LoadingScreen1;
  let fixture: ComponentFixture<LoadingScreen1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreen1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingScreen1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
