import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedDocuments } from './saved-documents';

describe('SavedDocuments', () => {
  let component: SavedDocuments;
  let fixture: ComponentFixture<SavedDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedDocuments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedDocuments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
