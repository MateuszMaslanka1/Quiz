import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WelcomeComponent} from './welcome.component';
import {JsonServerService} from '../json-server.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: JsonServerService, useClass: MockJsonServerService},
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
});
