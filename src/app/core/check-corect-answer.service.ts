import { Injectable } from '@angular/core';
import {isNullOrUndefined} from 'util';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CheckCorectAnswerService {

  constructor() { }

  private result = 0;
  private ListForObjAnswer = [];

  //
  // getListOfAnswere(questionsForShowFromQuiz, answerFromQuiz) {
  //     this.answerList = questionsForShowFromQuiz.value.answers;
  //     console.log(this.answerList);
  // }

  checkAnswer(questionsForShowFromQuiz, answerFromQuiz): boolean {
      // console.log(questionsForShowFromQuiz.value, answerFromQuiz);
      // const idQuestion = questionsForShowFromQuiz.value.id;


      return +answerFromQuiz === questionsForShowFromQuiz.value.correctAnswer;
  }

  sumPoints() {
      this.result++;
      return this.result;
  }

  checkHowMany(questionsForShowFromQuiz, answerFromQuiz, index) {

    // tslint:disable-next-line:prefer-for-of
     for (let i = 0; i < questionsForShowFromQuiz.length; i++) {
       console.log(index);
       if (+questionsForShowFromQuiz[i].key === index) {
         questionsForShowFromQuiz[i].value.userAnswer = answerFromQuiz;
       }
    }
     console.log(questionsForShowFromQuiz);
  }
}
