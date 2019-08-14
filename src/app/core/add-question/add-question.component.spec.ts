import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddQuestionComponent } from './add-question.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {JsonServerService} from '../json-server.service';
import {CheckAllAnswersAreInscribedService} from './check-all-answers-are-inscribed.service';

class MockJsonServerService {
  sendNewQuestionToJsonServer() {}
}

class MockCheckAllAnswersAreInscribedService {
  checkLenghtOfAnswers() {}
}

describe('AddQuestionComponent', () => {
  let a;
  let component: AddQuestionComponent;
  let fixture: ComponentFixture<AddQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [CheckAllAnswersAreInscribedService,
        {provide: JsonServerService, useClass: MockJsonServerService},
        {provide: CheckAllAnswersAreInscribedService, useClass: MockCheckAllAnswersAreInscribedService},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // tslint:disable-next-line:only-arrow-functions
  it('and so is a spec', function() {
    a = true;
    expect(a).toBe(true);
  });
});
