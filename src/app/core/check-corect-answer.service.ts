import {Injectable} from '@angular/core';
import {Quizdata} from '../model/quiz-data/quiz-data';
import {SumOfPoint} from '../model/sum-of-point/sum-of-point';
import {isNullOrUndefined} from 'util';
import {KeyAnswer} from '../model/key-answer/key-answer';

@Injectable({
  providedIn: 'root'
})
export class CheckCorectAnswerService {

  constructor() { }

  private result = 0;
  private resultWhenBadAnswer = 0;
  private ListForObjAnswer = [];
  public tabWithQuestionAndAnswer: KeyAnswer[] = [];
  private counterForQuantityOfSumResoult = 0;
  private resultOneTime: number;
  private resultWhenBadAnswerOneTime: number

  checkAnswer(questionsForShowFromQuiz, flag): SumOfPoint {
    questionsForShowFromQuiz.forEach( el => {
      if (isNullOrUndefined(el.value.userAnswer) !== true) {
        (+el.value.correctAnswer === +el.value.userAnswer) ? this.sumPoints() : this.sumPointsBadAnswer(flag);
      }
    });
    if (this.counterForQuantityOfSumResoult === 0) {
      this.counterForQuantityOfSumResoult++;
      this.resultOneTime = this.result;
      this.resultWhenBadAnswerOneTime = this.resultWhenBadAnswer;
      return {result: this.result, resultWhenBadAnswer: this.resultWhenBadAnswer};
    } else {
      return {result: this.resultOneTime, resultWhenBadAnswer: this.resultWhenBadAnswerOneTime};
    }
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
     // console.log(this.tabWithQuestionAndAnswer);
     return questionsForShowFromQuiz;
  }

  getQuestionAndAnswer() {
   return this.tabWithQuestionAndAnswer;
  }

  clearListWithQuestionAndAnswer() {
     this.tabWithQuestionAndAnswer = [];
   }
}
