import { Component, OnInit, Input } from '@angular/core';
import { CheckCorectAnswerService } from '../check-corect-answer.service';
import {log} from 'util';

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
  @Input() ObjWithResoult;

  protected above = 'above'

  ngOnInit() {
    if (this.ObjWithResoult) {
        this.result = this.ObjWithResoult.resoult;
        this.sumOfAllPoints = this.ObjWithResoult.sumOfAllPoints;
        this.resultWhenBadAnswer = this.ObjWithResoult.resultWhenBadAnswer;
     }
    this.listWithQuestionAndAnswer = this.checkCorectAnswer.getQuestionAndAnswer();
    this.columnsToDisplay = ['value.id', 'value.question', 'value.answers', 'value.userAnswer'];
    this.pointColumn = ['sumOfPoint'];
  }

}
