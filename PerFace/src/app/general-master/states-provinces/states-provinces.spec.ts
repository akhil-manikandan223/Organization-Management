import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesProvinces } from './states-provinces';

describe('StatesProvinces', () => {
  let component: StatesProvinces;
  let fixture: ComponentFixture<StatesProvinces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatesProvinces]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatesProvinces);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
