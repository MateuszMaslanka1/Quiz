import { Injectable } from '@angular/core';
import { Quizdata } from '../model/quiz-data/quiz-data';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CheckCorectAnswerService {

  constructor() { }

  private result = 0;
  private ListForObjAnswer = [];
  public tabWithQuestionAndAnswer = [];

  //
  // getListOfAnswere(questionsForShowFromQuiz, answerFromQuiz) {
  //     this.answerList = questionsForShowFromQuiz.value.answers;
  //     console.log(this.answerList);
  // }

  checkAnswer(questionsForShowFromQuiz): number {
    console.log(questionsForShowFromQuiz);

    questionsForShowFromQuiz.forEach( el => {
      if (+el.value.correctAnswer === +el.value.userAnswer) {
        this.sumPoints();
      }
    });
    return this.result;
  }

  sumPoints() {
      this.result++;
      return this.result;
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
