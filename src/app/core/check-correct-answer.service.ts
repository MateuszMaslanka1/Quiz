import {Injectable} from '@angular/core';
import {QuizData} from '../model/quiz-data';
import {SumOfPoints} from '../model/sum-of-points';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class CheckCorrectAnswerService {

  tabWithQuestionAndAnswer: QuizData[] = [];

  private result = 0;
  private resultWhenBadAnswer = 0;
  private counterForQuantityOfSumResult = 0;
  private resultOneTime: number;
  private resultWhenBadAnswerOneTime: number;

  constructor() { }

  checkAnswer(questionsForShowFromQuiz = [], flag: string): SumOfPoints {
    questionsForShowFromQuiz.forEach( el => {
      if (isNullOrUndefined(el.value.userAnswer) !== true) {
        (+el.value.correctAnswer === +el.value.userAnswer) ? this.sumPoints() : this.sumPointsBadAnswer(flag);
      }
    });
    if (this.counterForQuantityOfSumResult === 0) {
      this.counterForQuantityOfSumResult++;
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

  sumPointsBadAnswer(flag: string) {
    if (JSON.parse(flag) === true) {
        this.result--;
    }
    this.resultWhenBadAnswer++;
    return this.resultWhenBadAnswer;
  }

  checkUserChoose(questionsForShowFromQuiz = [], answerFromQuiz: string, index: number): Array<QuizData> {
     questionsForShowFromQuiz.forEach(el => {
      if (+el.key === +index) {
        el.value.userAnswer = answerFromQuiz;
      }
    });
     this.tabWithQuestionAndAnswer = questionsForShowFromQuiz;
     return questionsForShowFromQuiz;
  }

  getQuestionAndAnswer() {
   return this.tabWithQuestionAndAnswer;
  }
}
