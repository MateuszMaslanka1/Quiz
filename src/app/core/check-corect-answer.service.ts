import { Injectable } from '@angular/core';
import { Quizdata } from '../model/quiz-data/quiz-data';
import {element} from 'protractor';
import {SumOfPoint} from '../model/sum-of-point/sum-of-point';

@Injectable({
  providedIn: 'root'
})
export class CheckCorectAnswerService {

  constructor() { }

  private result = 0;
  private resultWhenBadAnswer = 0;
  private ListForObjAnswer = [];
  public tabWithQuestionAndAnswer = [];

  //
  // getListOfAnswere(questionsForShowFromQuiz, answerFromQuiz) {
  //     this.answerList = questionsForShowFromQuiz.value.answers;
  //     console.log(this.answerList);
  // }

  checkAnswer(questionsForShowFromQuiz): SumOfPoint {
    console.log(questionsForShowFromQuiz);
    questionsForShowFromQuiz.forEach( el => {
      (+el.value.correctAnswer === +el.value.userAnswer) ? this.sumPoints() : this.sumPointsBadAnswer();
    });
    return {result: this.result, resultWhenBadAnswer: this.resultWhenBadAnswer};
  }

  sumPoints() {
      this.result++;
      return this.result;
  }

  sumPointsBadAnswer() {
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
