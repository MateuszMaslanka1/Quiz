import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatTableModule} from '@angular/material';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [ MatTableModule ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show table on endcomponent', () => {
      component.result = 5;
      component.sumOfAllPoints = 5;
      component.resultWhenBadAnswer = 0;
      component.columnsToDisplay = ['value.id', 'value.question', 'value.answers', 'value.userAnswer'];
      fixture.detectChanges();
      expect(component.result).toBe(5);
      expect(component.sumOfAllPoints).toBe(5);
      expect(component.resultWhenBadAnswer).toBe(0);
      expect(component.columnsToDisplay).toEqual(['value.id', 'value.question', 'value.answers', 'value.userAnswer']);
  });
});
