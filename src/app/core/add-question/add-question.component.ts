import {Component, OnInit} from '@angular/core';
import {ConnectToJsonServerService} from '../connect-to-json-server.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent {

  constructor(private connectToJsonServerService: ConnectToJsonServerService) { }

  Arr = Array;
  numerOfAnswer = 0;
  answers = [];
  question = '';
  correctAnswer = 0;
  ObjWithQuestion = {};
  checkLongOfAnswer = false;

  checkLongAnswer() {
      (this.numerOfAnswer > 3 && this.question.length > 2) ? this.checkAllQuestionAreInscribed() : this.checkLongOfAnswer = false;
  }

  addQuestion() {
    this.numerOfAnswer++;
    this.checkLongAnswer();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.answers, event.previousIndex, event.currentIndex);
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
