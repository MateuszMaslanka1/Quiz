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
  result: number;
  sumOfAllPoints: number;
  resultWhenBadAnswer: number;
  @Input() listWithResoult: [];

  protected above = 'above'

  ngOnInit() {
    if (this.listWithResoult.length > 0) {
      this.result = this.listWithResoult[0].resoult;
      this.sumOfAllPoints = this.listWithResoult[0].sumOfAllPoints;
      this.resultWhenBadAnswer = this.listWithResoult[0].resultWhenBadAnswer;
    }
    this.listWithQuestionAndAnswer = this.checkCorectAnswer.getQuestionAndAnswer();
    this.columnsToDisplay = ['value.id', 'value.question', 'value.answers', 'value.userAnswer'];
    this.pointColumn = ['sumOfPoint'];
  }

}
