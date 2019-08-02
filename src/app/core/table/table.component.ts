import {Component, Input, OnInit} from '@angular/core';
import {CheckCorectAnswerService} from '../check-corect-answer.service';
import {Quizdata} from '../../model/quiz-data/quiz-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private checkCorectAnswer: CheckCorectAnswerService) { }

  @Input() ObjWithResoult;

  protected listWithQuestionAndAnswer: Quizdata[] = [];
  protected columnsToDisplay = [];
  protected result: number;
  protected sumOfAllPoints: number;
  protected resultWhenBadAnswer: number;
  protected above = 'above';

  ngOnInit() {
    if (this.ObjWithResoult) {
        this.result = this.ObjWithResoult.resoult;
        this.sumOfAllPoints = this.ObjWithResoult.sumOfAllPoints;
        this.resultWhenBadAnswer = this.ObjWithResoult.resultWhenBadAnswer;
     }
    this.listWithQuestionAndAnswer = this.checkCorectAnswer.getQuestionAndAnswer();
    this.columnsToDisplay = ['value.id', 'value.question', 'value.answers', 'value.userAnswer'];
  }

}
