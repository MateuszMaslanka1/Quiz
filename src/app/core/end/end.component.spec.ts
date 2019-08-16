import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EndComponent} from './end.component';
import {TableComponent} from '../table/table.component';
import {MatTableModule} from '@angular/material';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TimeService} from '../time.service';
import {CheckCorrectAnswerService} from '../check-correct-answer.service';
import {of} from 'rxjs';

class MockTimeService {
  StopTimer() {
  }
}

class MockCheckCorrectAnswerService {
  getQuestionAndAnswer() {
    return [];
  }

  checkAnswer() {
    return {
      result: '',
      resultWhenBadAnswer: ''
    };
  }
}

describe('EndComponent', () => {
  let component: EndComponent;
  let fixture: ComponentFixture<EndComponent>;
  // let activatedRoute: ActivatedRoute;
  let CheckCorrectAnswerService: CheckCorrectAnswerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EndComponent, TableComponent],
      imports: [MatTableModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: TimeService, useClass: MockTimeService},
        {provide: CheckCorrectAnswerService, useClass: MockCheckCorrectAnswerService},
        {provide: ActivatedRoute, useValue: {queryParams: of({flag: false})}}
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndComponent);
    component = fixture.componentInstance;
    // activatedRoute = TestBed.get(ActivatedRoute);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check data', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.getFlagFromJsonSever).toBeFalsy();
    expect(component.listWithQuestinAndAnswers.length).toBe(0);
   // spyOn(CheckCorrectAnswerService, '')
  });
});
