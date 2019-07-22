import { Injectable } from '@angular/core';
import {isNull} from 'util';

@Injectable({
  providedIn: 'root'
})
export class GoToQuestionWithoutAnswerService {

  constructor() { }

  private getIndex = null;
  private counter = 0;

  goToQuestion(tabWithQuestion, indexTabWithQuestion) {
      for (let i = indexTabWithQuestion; i < tabWithQuestion.length; i++) {
         if (isNull(tabWithQuestion[i].value.userAnswer) && this.counter === 0) {
           this.getIndex = i;
           this.counter++;
           } else if (tabWithQuestion[i].value.userAnswer !== null) {
             this.getIndex = null;
           }
        }
      this.counter = 0;
      return this.getIndex;
  }
}
