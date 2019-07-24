import { Component, OnInit } from '@angular/core';
import {CheckCorectAnswerService} from '../check-corect-answer.service';
import {SumOfPoint} from '../../model/sum-of-point/sum-of-point';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  constructor(private checkCorectAnswer: CheckCorectAnswerService) { }

  ListWithQuestinAndAnswers = [];
  resultFromCheckAnswer: SumOfPoint;
  sumOfAllPoints: number;

  ngOnInit() {
    this.ListWithQuestinAndAnswers = this.checkCorectAnswer.getQuestionAndAnswer();
    this.resultFromCheckAnswer = this.checkCorectAnswer.checkAnswer(this.ListWithQuestinAndAnswers);
    console.log(this.resultFromCheckAnswer);
    this.sumOfAllPoints = this.ListWithQuestinAndAnswers.length;
  }

}
