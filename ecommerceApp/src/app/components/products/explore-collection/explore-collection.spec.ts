import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCollection } from './explore-collection';

describe('ExploreCollection', () => {
  let component: ExploreCollection;
  let fixture: ComponentFixture<ExploreCollection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreCollection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreCollection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
