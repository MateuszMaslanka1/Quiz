import {TestBed} from '@angular/core/testing';

import {CheckCorrectAnswerService} from './check-correct-answer.service';

describe('CheckCorrectAnswer.Service.SpecService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckCorrectAnswerService = TestBed.get(CheckCorrectAnswerService);
    expect(service).toBeTruthy();
  });

  it('should be true and start sumPoint', () => {
    const service: CheckCorrectAnswerService = TestBed.get(CheckCorrectAnswerService);
    const spy = spyOn(service, 'sumPoints').and.callThrough();
    service.checkAnswer([{key: 1, value: {id: 1, question: 'Jaka jest stolica Omanu',
        answers: ['Ad-Dauha', 'Dubaj', 'Muskat', 'Bejrut'], correctAnswer: 2, userAnswer: '2'}}],
      'false');
    expect(spy).toHaveBeenCalled();
  });

  it('should be false and start sumPointsBadAnswer', () => {
    const service: CheckCorrectAnswerService = TestBed.get(CheckCorrectAnswerService);
    const spy = spyOn(service, 'sumPointsBadAnswer').and.callThrough();
    service.checkAnswer([{key: 1, value: {id: 1, question: 'Jaka jest stolica Omanu',
          answers: ['Ad-Dauha', 'Dubaj', 'Muskat', 'Bejrut'], correctAnswer: 2, userAnswer: '1'}}],
      'false');
    expect(spy).toHaveBeenCalled();
  });

  // it('should be user answer', () => {
  //   const service: CheckCorrectAnswerService = TestBed.get(CheckCorrectAnswerService);
  //   service.checkUserChoose([{key: 1, value: {id: 1, question: 'Jaka jest stolica Omanu',
  //       answers: ['Ad-Dauha', 'Dubaj', 'Muskat', 'Bejrut'], correctAnswer: 2, userAnswer: null}}], '2', 1);
  //
  //   const exce = {
  //     id: 1,
  //     question: 'Jaka jest stolica Omanu',
  //     answers: [],
  //     correctAnswer: 2,
  //     userAnswer: '2'
  //   } as QuizData;
  //
  //   expect(service.tabWithQuestionAndAnswer[0]).toContain(exce);
  // });
});
