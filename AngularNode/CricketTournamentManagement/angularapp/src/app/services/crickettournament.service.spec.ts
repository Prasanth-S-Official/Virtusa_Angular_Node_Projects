import { TestBed } from '@angular/core/testing';

import { CrickettournamentService } from './crickettournament.service';

describe('CrickettournamentService', () => {
  let service: CrickettournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrickettournamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
