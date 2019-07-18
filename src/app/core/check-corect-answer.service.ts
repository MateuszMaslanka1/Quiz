import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckCorectAnswerService {

  constructor() { }

  checkAnswer(questionsForShowFromQuiz, answerFromQuiz): boolean {
     console.log(questionsForShowFromQuiz.value.correctAnswer, answerFromQuiz);
     return +answerFromQuiz === questionsForShowFromQuiz.value.correctAnswer;
  }
}
