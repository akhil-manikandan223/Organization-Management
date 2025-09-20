import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageManagment } from './message-managment';

describe('MessageManagment', () => {
  let component: MessageManagment;
  let fixture: ComponentFixture<MessageManagment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageManagment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageManagment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
