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
      const ok = questionsForShowFromQuiz.value.id;
      this.isAnswerList.push({
        ok
      })

      return +answerFromQuiz === questionsForShowFromQuiz.value.correctAnswer;
  }

  sumPoints() {
      this.result++;
      return this.result;
  }
}
