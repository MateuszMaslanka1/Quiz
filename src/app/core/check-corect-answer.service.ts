import { Injectable } from '@angular/core';
import { Quizdata } from '../model/quiz-data/quiz-data';
import {SumOfPoint} from '../model/sum-of-point/sum-of-point';
import { ConnectToJsonServerService } from './connect-to-json-server.service';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class CheckCorectAnswerService {

  constructor(private jsonServerService: ConnectToJsonServerService) { }

  private result = 0;
  private resultWhenBadAnswer = 0;
  private ListForObjAnswer = [];
  public tabWithQuestionAndAnswer = [];

  checkAnswer(questionsForShowFromQuiz, flag): SumOfPoint {
    questionsForShowFromQuiz.forEach( el => {
      if (isNullOrUndefined(el.value.userAnswer) !== true) {
        (+el.value.correctAnswer === +el.value.userAnswer) ? this.sumPoints() : this.sumPointsBadAnswer(flag);
      }
    });
    return {result: this.result, resultWhenBadAnswer: this.resultWhenBadAnswer};
  }

  sumPoints() {
      this.result++;
      return this.result;
  }

  sumPointsBadAnswer(flag) {
    if (JSON.parse(flag) === true) {
        this.result--;
    }
    this.resultWhenBadAnswer++;
    return this.resultWhenBadAnswer;
  }

  checkUserChoose(questionsForShowFromQuiz, answerFromQuiz, index): Array<Quizdata> {
     questionsForShowFromQuiz.forEach(el => {
      if (+el.key === +index) {
        el.value.userAnswer = answerFromQuiz;
      }
    });
     this.tabWithQuestionAndAnswer = questionsForShowFromQuiz;
     console.log(this.tabWithQuestionAndAnswer);
     return questionsForShowFromQuiz;
  }

  getQuestionAndAnswer() {
   return this.tabWithQuestionAndAnswer;
  }
}
