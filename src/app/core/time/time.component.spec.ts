import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeComponent } from './time.component';
import {TimeService} from '../time.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('TimeComponent', () => {
  let component: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;

  class MockTimeService {
    startTimer() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: TimeService, useClass: MockTimeService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
