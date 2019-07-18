import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalSumOfPointsService {

  constructor() { }

  result = 0;

  sumPoints(answerFromQuiz: string) {
      return this.result = this.result + +answerFromQuiz;
  }
}
