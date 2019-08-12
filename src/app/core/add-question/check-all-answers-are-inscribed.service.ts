import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckAllAnswersAreInscribedService {

  private checkLongOfAnswer: boolean;

  constructor() { }

  checkLenghtOfAnswers(answers: string[] = [], numberOfAnswer: number) {
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
