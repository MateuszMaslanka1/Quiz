import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckAllAnswersAreInscribedService {

  constructor() { }

  checkLenghtOfAnswers(answers: string[] = []) {
    let checkLongOfAnswer: boolean;
    for (const item of answers) {
        if (item.length < 2) {
          checkLongOfAnswer = false;
          break;
        } else {
          checkLongOfAnswer = true;
        }
      }
    return checkLongOfAnswer;
  }
}
