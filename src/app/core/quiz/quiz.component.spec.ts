import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {QuizComponent} from './quiz.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {JsonServerService} from '../json-server.service';
import {CheckCorrectAnswerService} from '../check-correct-answer.service';
import {GoToQuestionWithoutAnswerService} from '../go-to-question-without-answer.service';
import {TimeService} from '../time.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

class MockJsonServerService {
  getQuestionsFromJsonServer() {
    const listWithQuestion = [{
      id: 11,
      question: '',
      answers: [],
      correctAnswer: 11,
    }];
    return of(listWithQuestion);
  }
}

class MockGoToQuestionWithoutAnswerService {
  goToQuestion() {
    return 1;
  }
}

class MockCheckCorrectAnswerService {
  getQuestionAndAnswer() {
    return '';
  }

  checkUserChoose() {
    return [{
      id: 1, value: {
        id: 1, question: 'Jaka jest stolica Pakistanu',
        answers: ['a', 'a', 'a', 'a'], correctAnswer: 1, userAnswer: '2'
      }
    }];
  }
}

class MockTimeService {
  time$ = of(1);
}

class MockRouter {
  url = '/quiz/0';
   navigate() { }
}

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let timeService: TimeService;
  let goToQuestionWithoutAnswerService: GoToQuestionWithoutAnswerService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: JsonServerService, useClass: MockJsonServerService},
        {provide: CheckCorrectAnswerService, useClass: MockCheckCorrectAnswerService},
        {provide: GoToQuestionWithoutAnswerService, useClass: MockGoToQuestionWithoutAnswerService},
        {provide: Router, useClass: MockRouter},
        {provide: TimeService, useClass: MockTimeService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    timeService = TestBed.get(TimeService);
    goToQuestionWithoutAnswerService = TestBed.get(GoToQuestionWithoutAnswerService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check all data', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.answer = '2';
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith([`/quiz/${component.indexForNextQuestion}`]);
    expect(component.indexForNextQuestion).toBe(0);
    expect(component.questionsForShow).toBe(component.questionsForShow);
    expect(component.answer).toBe('2');
  });

  it('should start nextQuestion method' , fakeAsync(() => {
    spyOn(component, 'nextQuestion');
    const navigateSpy = spyOn(router, 'navigate');
    timeService.time$.subscribe(() => {
      const debugElement: DebugElement = fixture.debugElement;
      const buttonNextEL = debugElement.query(By.css('.button-next-pervious:nth-of-type(2)')).nativeElement;
      buttonNextEL.disabled = false;
      buttonNextEL.click();
    });
    expect(component.nextQuestion).toHaveBeenCalled();
  })) ;

  it('should next question', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    component.questionsForShow = [{value: 2, userAnswer: '2'}, {value: 1, userAnswer: '2'}];
    component.nextQuestion();
    fixture.detectChanges();
    component.answer = '2';
    fixture.detectChanges();
    expect(component.indexForNextQuestion).toBe(1);
    expect(component.answer).toBe('2');
    expect(navigateSpy).toHaveBeenCalledWith([`/quiz/${component.indexForNextQuestion}`]);
  }));

  it('should start previousQuestion method' , fakeAsync(() => {
    spyOn(component, 'previousQuestion');
    const navigateSpy = spyOn(router, 'navigate');
    timeService.time$.subscribe(() => {
      const debugElement: DebugElement = fixture.debugElement;
      const buttonPreviousEL = debugElement.query(By.css('.button-next-pervious')).nativeElement;
      buttonPreviousEL.disabled = false;
      buttonPreviousEL.click();
    });
    expect(component.previousQuestion).toHaveBeenCalled();
  })) ;

  it('should previous question', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.questionsForShow = [{value: 2, userAnswer: '2'}, {value: 1, userAnswer: '2'}];
    component.indexForNextQuestion = 1;
    fixture.detectChanges();
    component.previousQuestion();
    component.answer = '2';
    fixture.detectChanges();
    expect(component.indexForNextQuestion).toBe(0);
    expect(navigateSpy).toHaveBeenCalledWith([`/quiz/${component.indexForNextQuestion}`]);
    expect(component.answer).toBe('2');
  });

  it('should find next question without answere not null', () => {
    spyOn(goToQuestionWithoutAnswerService, 'goToQuestion').and.returnValue(1);
    component.questionsForShow = [{value: 2, userAnswer: '2'}, {value: 1, userAnswer: '2'}];
    component.chengeQuestion();
    component.answer = '2';
    fixture.detectChanges();
    expect(component.answer).toBe('2');
    expect(component.indexForNextQuestion).toBe(1);
  });
});


