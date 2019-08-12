import { TestBed } from '@angular/core/testing';

import { CheckAllAnswersAreInscribedService } from './check-all-answers-are-inscribed.service';

describe('CheckAllAnswersAreInscribedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckAllAnswersAreInscribedService = TestBed.get(CheckAllAnswersAreInscribedService);
    expect(service).toBeTruthy();
  });
});
