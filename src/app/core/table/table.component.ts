import {Component, Input, OnInit} from '@angular/core';
import {CheckCorrectAnswerService} from '../check-correct-answer.service';
import {QuizData} from '../../model/quiz-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() ObjWithResoult;
  protected listWithQuestionAndAnswer: QuizData[] = [];
  protected columnsToDisplay = [];
  protected result: number;
  protected sumOfAllPoints: number;
  protected resultWhenBadAnswer: number;
  protected above = 'above';

  constructor(private checkCorectAnswer: CheckCorrectAnswerService) { }

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
