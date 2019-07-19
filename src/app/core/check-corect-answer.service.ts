import { Injectable } from '@angular/core';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class CheckCorectAnswerService {

  constructor() { }

  private result = 0;
  private isAnswerList = [];
  private listForLastAnswere = [];
  private getAnswer;

  checkAnswer(questionsForShowFromQuiz, answerFromQuiz): boolean {
      // console.log(questionsForShowFromQuiz.value, answerFromQuiz);
      const idQuestion = questionsForShowFromQuiz.value.id;

      this.isAnswerList.push({
         idQuestion,
         answerFromQuiz
       });

     //  this.isAnswerList.forEach((element, index) => {
     //     if (this.isAnswerList[index].idQuestion === questionsForShowFromQuiz.value.id) {
     //        this.isAnswerList[index].idQuestion = element;
     //        console.log(element);
     //     }
     // });
     //
     //  console.log(this.isAnswerList);

      this.isAnswerList.forEach((element, index) => {
           if (element.idQuestion === questionsForShowFromQuiz.value.id) {
             this.getAnswer = element
             this.isAnswerList.splice(index, 1);
           }
       });

      // console.log(this.getAnswer);
      this.isAnswerList.push(
        this.getAnswer
      );
      //console.log(this.isAnswerList);

      this.isAnswerList.forEach((element, index) => {
        if (element.idQuestion === questionsForShowFromQuiz.value.id) {
            console.log(element);
        }
        });

      return +answerFromQuiz === questionsForShowFromQuiz.value.correctAnswer;
  }

  sumPoints() {
      this.result++;
      return this.result;
  }
}
