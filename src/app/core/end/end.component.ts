import {Component, OnInit} from '@angular/core';
import {CheckCorectAnswerService} from '../check-corect-answer.service';
import {SumOfPoint} from '../../model/sum-of-point/sum-of-point';
import {ActivatedRoute} from '@angular/router';
import {CheckTimeService} from '../check-time.service';
import {Quizdata} from '../../model/quiz-data/quiz-data';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  constructor(private checkTime: CheckTimeService, private checkCorectAnswer: CheckCorectAnswerService,
              private route: ActivatedRoute) { }

  private ListWithQuestinAndAnswers: Quizdata[] = [];
  private resultFromCheckAnswer: SumOfPoint;
  private sumOfAllPoints: number;
  private getFlagFromJsonSever: string;
  protected ObjWithResoult = {};
  private counterForQuantityOfSumResoult = 0;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.getFlagFromJsonSever = params.flag;
    });
    this.ListWithQuestinAndAnswers = this.checkCorectAnswer.getQuestionAndAnswer();
    this.resultFromCheckAnswer = this.checkCorectAnswer.checkAnswer(this.ListWithQuestinAndAnswers, this.getFlagFromJsonSever);
    this.counterForQuantityOfSumResoult++;
    this.sumOfAllPoints = this.ListWithQuestinAndAnswers.length;
    this.checkTime.endTime();
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
