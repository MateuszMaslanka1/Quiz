import { Component, OnInit } from '@angular/core';
import {CheckCorectAnswerService} from '../check-corect-answer.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  constructor(private checkCorectAnswer: CheckCorectAnswerService) { }

  ListWithQuestinAndAnswers = [];
  resoultFromCheckAnswer: number;
  sumOfAllPoints: number;

  ngOnInit() {
    this.ListWithQuestinAndAnswers = this.checkCorectAnswer.getQuestionAndAnswer();
    this.resoultFromCheckAnswer = this.checkCorectAnswer.checkAnswer(this.ListWithQuestinAndAnswers);
    this.sumOfAllPoints = this.ListWithQuestinAndAnswers.length;
  }

}
