import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsInHouse } from './assets-in-house';

describe('AssetsInHouse', () => {
  let component: AssetsInHouse;
  let fixture: ComponentFixture<AssetsInHouse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsInHouse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsInHouse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
