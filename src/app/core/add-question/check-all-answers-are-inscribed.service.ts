import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckAllAnswersAreInscribedService {

  constructor() { }

  private checkLongOfAnswer: boolean;

  checkLenghtOfAnswers(answers, numberOfAnswer) {
    if (answers.length === numberOfAnswer) {
      for (const item of answers) {
        if (item.length < 2) {
          this.checkLongOfAnswer = false;
          break;
        } else {
          this.checkLongOfAnswer = true;
        }
      }
    } else {
      this.checkLongOfAnswer = false;
    }
    return this.checkLongOfAnswer;
  }
}
