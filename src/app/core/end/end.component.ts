import { Component, OnInit } from '@angular/core';
import {CheckCorectAnswerService} from '../check-corect-answer.service';
import {SumOfPoint} from '../../model/sum-of-point/sum-of-point';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  constructor(private checkCorectAnswer: CheckCorectAnswerService, private route: ActivatedRoute) { }

  ListWithQuestinAndAnswers = [];
  resultFromCheckAnswer: SumOfPoint;
  sumOfAllPoints: number;
  getFlagFromJsonSever: string;

  ngOnInit() {
    this.getFlagFromJsonSever = this.route.snapshot.url[1].path;
    this.ListWithQuestinAndAnswers = this.checkCorectAnswer.getQuestionAndAnswer();
    this.resultFromCheckAnswer = this.checkCorectAnswer.checkAnswer(this.ListWithQuestinAndAnswers, this.getFlagFromJsonSever);
    this.sumOfAllPoints = this.ListWithQuestinAndAnswers.length;
  }

}
