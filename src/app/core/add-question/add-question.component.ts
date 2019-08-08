import {Component} from '@angular/core';
import {ConnectToJsonServerService} from '../connect-to-json-server.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent {

  constructor(private connectToJsonServerService: ConnectToJsonServerService) { }

  arrayOfQuantityInput = Array;
  numerOfAnswer = 0;
  answers: string[] = [];
  question = '';
  correctAnswer = 0;
  ObjWithQuestion = {};
  checkLongOfAnswer = false;

  checkLongAnswer() {
      (this.numerOfAnswer > 3 && this.question.length > 2) ? this.checkAllQuestionAreInscribed() : this.checkLongOfAnswer = false;
  }

  deleteAnswer(indexOfAnswer, e) {
    this.answers = this.answers.filter((el, index) =>
        index !== indexOfAnswer
    );
    this.numerOfAnswer--;
  }

  addQuestion() {
    this.answers.push('');
    this.numerOfAnswer++;
    this.checkLongAnswer();
  }

  addQuestionToJsonServer() {
    swal.fire({
      title: 'Czy napewno chesz zatwierdzić pytania', text: 'kliknij na przycisk', type: 'warning',
      showCancelButton: true, cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        this.ObjWithQuestion = {
         question: this.question,
         answers:  this.answers,
         correctAnswer: this.correctAnswer,
         userAnswer: null
        };
        this.connectToJsonServerService.sendNewQuestionToJsonServer(this.ObjWithQuestion);
        this.clearAll();
      }
    });
  }

  checkAllQuestionAreInscribed() {
    if (this.answers.length === this.numerOfAnswer) {
      for (const item of this.answers) {
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
  }

  clearAll() {
    this.answers = [];
    this.question = null;
    this.correctAnswer = null;
    this.numerOfAnswer = 0;
    this.checkLongOfAnswer = false;
  }
}
