import { Component, OnInit } from '@angular/core';
import {CheckCorectAnswerService} from '../check-corect-answer.service';
import {SumOfPoint} from '../../model/sum-of-point/sum-of-point';
import { ActivatedRoute, Router } from '@angular/router';
import {CheckTimeService} from '../check-time.service';
import {log} from 'util';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  constructor(private checkTime: CheckTimeService, private checkCorectAnswer: CheckCorectAnswerService,
              private route: ActivatedRoute, private router: Router) { }

  private ListWithQuestinAndAnswers = [];
  private resultFromCheckAnswer: SumOfPoint;
  private sumOfAllPoints: number;
  private getFlagFromJsonSever: string;
  protected columnsToDisplay = [];
  protected listWithResoult = [];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.getFlagFromJsonSever = params.flag;
    });
    this.ListWithQuestinAndAnswers = this.checkCorectAnswer.getQuestionAndAnswer();
    this.resultFromCheckAnswer = this.checkCorectAnswer.checkAnswer(this.ListWithQuestinAndAnswers, this.getFlagFromJsonSever);
    this.sumOfAllPoints = this.ListWithQuestinAndAnswers.length;
    this.checkTime.endTime();
   // this.checkCorectAnswer.clearListWithQuestionAndAnswer();
    this.listWithResoult = [{resoult: this.resultFromCheckAnswer.result,
      resultWhenBadAnswer: this.resultFromCheckAnswer.resultWhenBadAnswer, sumOfAllPoints: this.sumOfAllPoints}];
  }

  goToWelcomePage() {
    window.location.assign(window.location.pathname);
  }

}
