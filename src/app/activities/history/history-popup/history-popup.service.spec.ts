import { TestBed } from '@angular/core/testing';

import { HistoryPopupService } from './history-popup.service';

describe('HistoryPopupService', () => {
  let service: HistoryPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
