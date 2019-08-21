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

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let timeService: TimeService;

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
      return false;
    }
  }

  class MockCheckCorrectAnswerService {
    getQuestionAndAnswer() {
      return '';
    }
    checkUserChoose() {
      return [];
    }
  }

  class MockTimeService {
    time$ = of(1);
  }

  const router = {
    navigate: jasmine.createSpy('navigate'),
    url: '/quiz/0',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: JsonServerService, useClass: MockJsonServerService},
        {provide: CheckCorrectAnswerService, useClass: MockCheckCorrectAnswerService},
        {provide: GoToQuestionWithoutAnswerService, useClass: MockGoToQuestionWithoutAnswerService},
        {provide: Router, useValue: router},
        {provide: TimeService, useClass: MockTimeService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    timeService = TestBed.get(TimeService);
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
   });

  it('check all data', () => {
     component.answer = '2';
     fixture.detectChanges();
     component.ngOnInit();
     fixture.detectChanges();
     expect(router.navigate).toHaveBeenCalledWith([`/quiz/${component.indexForNextQuestion}`]);
     expect(component.indexForNextQuestion).toBe(0);
     expect(component.questionsForShow).toBe(component.questionsForShow);
     expect(component.answer).toBe('2');
   });

  it('should next question', fakeAsync(() => {
     timeService.time$.subscribe(data => {
       const debugElement: DebugElement = fixture.debugElement;
       const buttonNextEL = debugElement.query(By.css('.button-next-pervious:nth-of-type(2)')).nativeElement;
       component.answer = '2';
       buttonNextEL.disabled = false;
       buttonNextEL.click();
       expect(component.indexForNextQuestion).toBe(1);
       expect(component.answer).toBe(component.answer);
       // expect(router.navigate).toHaveBeenCalledWith([`/quiz/${component.indexForNextQuestion}`]);
     });
   }));

  it('should previous question', fakeAsync(() => {
    timeService.time$.subscribe(data => {
      const debugElement: DebugElement = fixture.debugElement;
      const buttonPreviousEL = debugElement.query(By.css('.button-next-pervious')).nativeElement;
      component.answer = '2';
      component.indexForNextQuestion = 1;
      buttonPreviousEL.disabled = false;
      buttonPreviousEL.click();
      expect(component.indexForNextQuestion).toBe(0);
      expect(component.answer).toBe(component.answer);
    });
  }));
});
