import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReviews } from './manage-reviews';

describe('ManageReviews', () => {
  let component: ManageReviews;
  let fixture: ComponentFixture<ManageReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageReviews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
