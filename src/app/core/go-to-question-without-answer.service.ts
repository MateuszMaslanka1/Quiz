import {Injectable} from '@angular/core';
import {isNull} from 'util';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GoToQuestionWithoutAnswerService {

  private getIndex = null;
  private counter = 0;

  constructor(private router: Router) { }

  goToQuestion(tabWithQuestion = [], indexTabWithQuestion: number) {
      for (let i = indexTabWithQuestion; i < tabWithQuestion.length; i++) {
        if (isNull(tabWithQuestion[i].value.userAnswer) && this.counter === 0) {
          this.getIndex = i;
          this.counter++;
          break;
        } else if (tabWithQuestion[i].value.userAnswer !== null) {
          this.goSummary();
          this.getIndex = null;
        }
      }
      this.counter = 0;
      return this.getIndex;
  }

  goSummary() {
    this.router.navigate([`/summary`]);
  }
}
