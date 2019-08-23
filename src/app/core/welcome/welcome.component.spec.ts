import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {WelcomeComponent} from './welcome.component';
import {JsonServerService} from '../json-server.service';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  class MockJsonServerService {
    getQuestionsFromJsonServer() {
      const todos = {questions: [
        {
          id: 1,
          question: 'Jaka jest stolica Omanu',
          answers: ['Ad-Dauha', 'Dubaj', 'Muskat', 'Bejrut'],
          correctAnswer: 2,
          userAnswer: null
        }]};
      return of( todos );
    }

    getTimeLimit() {
      const todos = {timeLimitMinutes: [
          120
      ]};
      return of( todos );
    }
  }

  class DummyComponent {}

  // class MyDirective {
  //   public directiveProperty = '/quiz/0';
  // }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [
        {provide: JsonServerService, useClass: MockJsonServerService}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to quiz', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const startButtonEL = debugElement.query(By.css('button')).nativeElement.getAttribute('ng-reflect-router-link');
    const addQuestionButtonEL = debugElement.query(By.css('button:last-child')).nativeElement.getAttribute('ng-reflect-router-link');
    fixture.detectChanges();
    expect(startButtonEL).toEqual('/quiz/0');
    expect(addQuestionButtonEL).toEqual('/add');
  });

  it('should welcome quantity of question and limitTime', () => {
    component.ngOnInit();
    component.quantityOfQuestions = 5;
    component.timeForUser = 120;
    fixture.detectChanges();
    expect(component.quantityOfQuestions).toBe(5);
    expect(component.timeForUser).toBe(120);
  });
});
