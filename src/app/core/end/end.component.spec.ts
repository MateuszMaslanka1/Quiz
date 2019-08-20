import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EndComponent} from './end.component';
import {TableComponent} from '../table/table.component';
import {MatTableModule} from '@angular/material';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TimeService} from '../time.service';
import {CheckCorrectAnswerService} from '../check-correct-answer.service';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

class MockTimeService {
  StopTimer() {
  }
}

class MockCheckCorrectAnswerService {
  getQuestionAndAnswer() {
    return [{
      id: 1, value: {
        id: 1, question: 'Jaka jest stolica Pakistanu',
        answers: ['a', 'a', 'a', 'a'], correctAnswer: 1, userAnswer: '2'
      }
    }];
  }

  checkAnswer() {
    return {
      result: 1,
      resultWhenBadAnswer: 2
    };
  }
}

describe('EndComponent', () => {
  let component: EndComponent;
  let fixture: ComponentFixture<EndComponent>;
  // let activatedRoute: ActivatedRoute;
  // const CheckCorrectAnswerService: CheckCorrectAnswerService;


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

  it('check all data to result', () => {
    component.ObjWithResoult = {
      resoult: 1,
      resultWhenBadAnswer: 2,
      sumOfAllPoints: 2
    };
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.getFlagFromJsonSever).toBeFalsy();
    expect(component.sumOfAllPoints).toBeGreaterThan(0);
    expect(component.ObjWithResoult).toEqual(component.ObjWithResoult);
  });

   // it('go to welcome', () => {
  // const bannerDe: DebugElement = fixture.debugElement;
   //  const paragraphDe = bannerDe.query(By.css('button')).nativeElement;
  //   const ok = jasmine.createSpy('paragraphDe');
  //   expect(ok).toHaveBeenCalledWith('/welcome');
   //  console.log(paragraphDe.click());
  //   // console.log(window.location.href);
  //   // expect(window.location.href).toContain('welcome');
 //  });
});
