import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SummaryComponent} from './summary.component';
import {TableComponent} from '../table/table.component';
import {JsonServerService} from '../json-server.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatTableModule} from '@angular/material';
import {Router} from '@angular/router';
import {of} from 'rxjs';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  class MockJsonServerService {
     getPenaltyPoitsMode() {
        const todos = {flag: true, id: 1};
        return of( todos );
     }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryComponent, TableComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: JsonServerService, useClass: MockJsonServerService},
        {provide: Router}
      ],
      imports: [ MatTableModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
