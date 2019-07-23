import {Component, OnInit} from '@angular/core';
import {CheckCorectAnswerService} from '../check-corect-answer.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(private checkCorectAnswer: CheckCorectAnswerService) { }

  listWithQuestionAndAnswer = [];
  columnsToDisplay = [];

  ngOnInit() {
    this.listWithQuestionAndAnswer = this.checkCorectAnswer.getQuestionAndAnswer();
    this.columnsToDisplay = ['value.id', 'value.question', 'value.answers', 'value.userAnswer'];
    console.log(this.listWithQuestionAndAnswer);
  }

}
