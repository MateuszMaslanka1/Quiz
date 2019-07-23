import { Injectable } from '@angular/core';
import {isNullOrUndefined} from 'util';
import {element} from 'protractor';
import { Quizdata } from '../model/quiz-data/quiz-data';

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

  checkUserChoose(questionsForShowFromQuiz, answerFromQuiz, index): Array<Quizdata> {
     questionsForShowFromQuiz.forEach(el => {
      if (+el.key === index) {
        el.value.userAnswer = answerFromQuiz;
      }
    });
     console.log(questionsForShowFromQuiz);
     return questionsForShowFromQuiz;
  }
}
