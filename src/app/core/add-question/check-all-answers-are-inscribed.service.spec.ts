import { TestBed } from '@angular/core/testing';

import { CheckAllAnswersAreInscribedService } from './check-all-answers-are-inscribed.service';

describe('CheckAllAnswersAreInscribedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckAllAnswersAreInscribedService = TestBed.get(CheckAllAnswersAreInscribedService);
    expect(service).toBeTruthy();
  });

  it('should be checkLongOfAnswer true', () => {
    const service: CheckAllAnswersAreInscribedService = TestBed.get(CheckAllAnswersAreInscribedService);
    expect(service.checkLenghtOfAnswers(['teskt', 'tekst'])).toBeTruthy();
  });

  it('should be checkLongOfAnswer false if validation is shorter ', () => {
    const service: CheckAllAnswersAreInscribedService = TestBed.get(CheckAllAnswersAreInscribedService);
    expect(service.checkLenghtOfAnswers(['a', 'a'])).toBeFalsy();
  });

  it('should be checkLongOfAnswer false if validation is shorter ', () => {
    const service: CheckAllAnswersAreInscribedService = TestBed.get(CheckAllAnswersAreInscribedService);
    expect(service.checkLenghtOfAnswers(['', ''])).toBeFalsy();
  });
});
