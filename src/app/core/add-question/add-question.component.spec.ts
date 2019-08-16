import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AddQuestionComponent} from './add-question.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {JsonServerService} from '../json-server.service';
import {CheckAllAnswersAreInscribedService} from './check-all-answers-are-inscribed.service';
import * as sweetAlert from 'sweetalert2';
import swal from 'sweetalert2';
import {FormControl, Validators} from '@angular/forms';

class MockJsonServerService {
  sendNewQuestionToJsonServer() {
  }
}

class MockCheckAllAnswersAreInscribedService {
  checkLenghtOfAnswers() {
  }
}

describe('AddQuestionComponent', () => {
  let component: AddQuestionComponent;
  let fixture: ComponentFixture<AddQuestionComponent>;
  let checkAllAnswersAreInscribedService: CheckAllAnswersAreInscribedService;

  const question = 'asd';

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
    checkAllAnswersAreInscribedService = TestBed.get(CheckAllAnswersAreInscribedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be false validation', () => {
    spyOn(checkAllAnswersAreInscribedService, 'checkLenghtOfAnswers').and.returnValue(true);
    component.question = 'asd';
    component.numberOfAnswer = 5;
    fixture.detectChanges();
    component.checkLongAnswer();
    fixture.detectChanges();
    expect(component.checkLongOfAnswer).toBeTruthy();
  });

  it('should be number increment and add', () => {
    component.numberOfAnswer = 1;
    fixture.detectChanges();
    component.addAnswer();
    fixture.detectChanges();
    expect(component.numberOfAnswer).toBe(2);
    expect(component.answers.length).toBe(1);
  });

  it('should be clear all data', () => {
      component.clearAll();
      fixture.detectChanges();
      expect(component.answers.length).toBe(0);
      expect(component.validForTextArea.valid).toBeTruthy();
      expect(component.validationForInput[0].valid).toBeTruthy();
      expect(component.question).toBeNull();
      expect(component.correctAnswer).toBeNull();
      expect(component.numberOfAnswer).toBe(0);
      expect(component.checkLongOfAnswer).toBeFalsy();
  });

  it('should be valid input', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.validationForInput[0].valid).toBeTruthy();
  });
});
