import { Component, OnInit, Input } from '@angular/core';
import { CheckCorectAnswerService } from '../check-corect-answer.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private checkCorectAnswer: CheckCorectAnswerService) { }

  listWithQuestionAndAnswer = [];
  columnsToDisplay = [];
  pointColumn = [];

  protected above = 'above';
  protected test;

  ngOnInit() {
    this.listWithQuestionAndAnswer = this.checkCorectAnswer.getQuestionAndAnswer();
    this.columnsToDisplay = ['value.id', 'value.question', 'value.answers', 'value.userAnswer'];
    this.pointColumn = ['sumOfPoint'];
  }

}
