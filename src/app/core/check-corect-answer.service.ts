import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckCorectAnswerService {

  constructor() { }

  private result = 0;

  private isAnswerList = [];

  checkAnswer(questionsForShowFromQuiz, answerFromQuiz): boolean {
      console.log(questionsForShowFromQuiz.value, answerFromQuiz);
      const idUser = questionsForShowFromQuiz.value.id;
      this.isAnswerList.push({
        idUser
      })
      console.log(this.isAnswerList);
      return +answerFromQuiz === questionsForShowFromQuiz.value.correctAnswer;
  }

  sumPoints() {
      this.result++;
      return this.result;
  }
}
