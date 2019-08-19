import {Component, OnInit} from '@angular/core';
import {CheckCorrectAnswerService} from '../check-correct-answer.service';
import {SumOfPoints} from '../../model/sum-of-points';
import {ActivatedRoute, Router} from '@angular/router';
import {TimeService} from '../time.service';
import {QuizData} from '../../model/quiz-data';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  getFlagFromJsonSever: string;
  listWithQuestinAndAnswers: QuizData[] = [];
  resultFromCheckAnswer: SumOfPoints;
  sumOfAllPoints: number;
  ObjWithResoult = {};

  constructor(private checkTime: TimeService,
              private checkCorectAnswer: CheckCorrectAnswerService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.getFlagFromJsonSever = params.flag;
    });
    this.listWithQuestinAndAnswers = this.checkCorectAnswer.getQuestionAndAnswer();
    this.resultFromCheckAnswer = this.checkCorectAnswer.checkAnswer(this.listWithQuestinAndAnswers, this.getFlagFromJsonSever);
    this.sumOfAllPoints = this.listWithQuestinAndAnswers.length;
    this.checkTime.StopTimer();
    this.ObjWithResoult = {
      resoult: this.resultFromCheckAnswer.result,
      resultWhenBadAnswer: this.resultFromCheckAnswer.resultWhenBadAnswer,
      sumOfAllPoints: this.sumOfAllPoints
    };
  }

  goToWelcomePage() {
    window.location.assign('/welcome');
  }
}
