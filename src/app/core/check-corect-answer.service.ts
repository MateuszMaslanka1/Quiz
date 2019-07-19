import { Injectable } from '@angular/core';
import {isNullOrUndefined} from 'util';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CheckCorectAnswerService {

  constructor() { }

  private result = 0;
  private isAnswerList = [];
  private getAnswer;

  checkAnswer(questionsForShowFromQuiz, answerFromQuiz): boolean {
      // console.log(questionsForShowFromQuiz.value, answerFromQuiz);
      const idQuestion = questionsForShowFromQuiz.value.id;

      this.isAnswerList.push({
         idQuestion,
         answerFromQuiz
       });

      console.log(this.isAnswerList);
      return +answerFromQuiz === questionsForShowFromQuiz.value.correctAnswer;
  }

  deleteAnswer() {
    this.isAnswerList.pop();
    console.log(this.isAnswerList);
  }

  sumPoints() {
      this.result++;
      return this.result;
  }
}
