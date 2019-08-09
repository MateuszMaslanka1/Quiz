import {Component, OnInit} from '@angular/core';
import {CheckCorrectAnswerService} from '../check-correct-answer.service';
import {SumOfPoints} from '../../model/sum-of-points';
import {ActivatedRoute} from '@angular/router';
import {TimeService} from '../time.service';
import {QuizData} from '../../model/quiz-data';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  private ListWithQuestinAndAnswers: QuizData[] = [];
  private resultFromCheckAnswer: SumOfPoints;
  private sumOfAllPoints: number;
  private getFlagFromJsonSever: string;
  protected ObjWithResoult = {};
  private counterForQuantityOfSumResoult = 0;

  constructor(private checkTime: TimeService, private checkCorectAnswer: CheckCorrectAnswerService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.getFlagFromJsonSever = params.flag;
    });
    this.ListWithQuestinAndAnswers = this.checkCorectAnswer.getQuestionAndAnswer();
    this.resultFromCheckAnswer = this.checkCorectAnswer.checkAnswer(this.ListWithQuestinAndAnswers, this.getFlagFromJsonSever);
    this.counterForQuantityOfSumResoult++;
    this.sumOfAllPoints = this.ListWithQuestinAndAnswers.length;
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
