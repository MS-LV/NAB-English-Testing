import { TestBed } from '@angular/core/testing';

import { EverydayService } from './everyday.service';

describe('DictionaryService', () => {
  let service: EverydayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EverydayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
