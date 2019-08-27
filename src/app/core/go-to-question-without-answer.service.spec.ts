import {TestBed} from '@angular/core/testing';

import {GoToQuestionWithoutAnswerService} from './go-to-question-without-answer.service';
import {Router} from '@angular/router';

const router = {
  navigate: jasmine.createSpy('navigate')
};

describe('GoToQuestionWithoutAnswer.Service.SpecService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: Router, useValue: router}
    ],
}));

  it('should be created', () => {
    const service: GoToQuestionWithoutAnswerService = TestBed.get(GoToQuestionWithoutAnswerService);
    expect(service).toBeTruthy();
  });

  it('should go to summary', () => {
    const service: GoToQuestionWithoutAnswerService = TestBed.get(GoToQuestionWithoutAnswerService);
    service.goToQuestion([{key: 0, value: {id: 1, question: 'Jaka jest stolica Omanu', answers: ['Ad-Dauha', 'Dubaj', 'Muskat', 'Bejrut'],
        correctAnswer: 2, userAnswer: '2'}},
      {key: 1, value: {id: 2, question: 'Jaka jest stolica Omanu', answers: ['Ad-Dauha', 'Dubaj', 'Muskat', 'Bejrut'],
        correctAnswer: 2, userAnswer: '2'}}], 1);
    expect(router.navigate).toHaveBeenCalledWith([`/summary`]);
  });
});
