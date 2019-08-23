import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SummaryComponent} from './summary.component';
import {TableComponent} from '../table/table.component';
import {JsonServerService} from '../json-server.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatTableModule} from '@angular/material';
import {Router} from '@angular/router';
import {of} from 'rxjs';


class MockJsonServerService {
  getPenaltyPoitsMode() {
    const todos = {flag: true, id: 1};
    return of( todos );
  }
}

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryComponent, TableComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: JsonServerService, useClass: MockJsonServerService},
        {provide: Router, useValue: router}
      ],
      imports: [ MatTableModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should back to quiz', () => {
    component.backToQuiz();
    expect(router.navigate).toHaveBeenCalledWith([`/quiz/0`]);
  });
});
