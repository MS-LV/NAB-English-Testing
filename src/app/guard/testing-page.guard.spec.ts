import { TestBed } from '@angular/core/testing';

import { TestingPageGuard } from './testing-page.guard';

describe('TestingPageGuard', () => {
  let guard: TestingPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TestingPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
