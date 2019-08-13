import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizComponent} from './quiz.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {JsonServerService} from '../json-server.service';
import {CheckCorrectAnswerService} from '../check-correct-answer.service';
import {GoToQuestionWithoutAnswerService} from '../go-to-question-without-answer.service';
import {TimeService} from '../time.service';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  class MockJsonServerService {
    getQuestionsFromJsonServer() {
      const t = [{
        id: 11,
        question: '',
        answers: [],
        correctAnswer: 11,
      }];
      return of(t);
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

  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: JsonServerService, useClass: MockJsonServerService},
        {provide: CheckCorrectAnswerService, useClass: MockCheckCorrectAnswerService},
        {provide: GoToQuestionWithoutAnswerService, useClass: MockGoToQuestionWithoutAnswerService},
        {provide: ActivatedRoute},
        {provide: Router, useValue: router},
        {provide: TimeService, useValue: { checkTimeService: {time$: of(123) } } }
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
