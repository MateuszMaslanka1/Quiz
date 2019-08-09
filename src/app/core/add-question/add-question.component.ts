import {Component, OnInit} from '@angular/core';
import {JsonServerService} from '../json-server.service';
import swal from 'sweetalert2';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  arrayOfQuantityInput = Array;
  numberOfAnswer = 0;
  answers: string[] = [];
  question = '';
  correctAnswer = 0;
  ObjWithQuestion = {};
  checkLongOfAnswer = false;
  validForTextArea = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  form = new FormGroup({
    0: new FormControl('', Validators.minLength(2)),
    1: new FormControl('', Validators.minLength(2))
  });
  control = [];

  constructor(private connectToJsonServerService: JsonServerService, ) {}

  ngOnInit() {
     for (let i = 0; i < 6; i++) {
     this.control[i] = new FormControl('value', Validators.minLength(2));
     }
  }

  checkLongAnswer() {
      (this.numberOfAnswer > 1 && this.question.length > 2) ? this.checkAllQuestionAreInscribed() : this.checkLongOfAnswer = false;
  }

  deleteAnswer(indexOfAnswer, e) {
    swal.fire({ title: 'Czy napewno chesz usunąć odpowiedź', text: 'kliknij na przycisk', type: 'warning',
      showCancelButton: true, cancelButtonColor: '#d33'}).then((result) => {
        if (result.value) {
          this.answers = this.answers.filter((el, index) =>
            index !== indexOfAnswer
          );
          this.numberOfAnswer--;
          swal.fire('Usunięto!', 'Twoja odpowiedź została usunięta.', 'success');
        }
      });
  }

  addAnswer() {
    this.answers.push('');
    this.numberOfAnswer++;
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
    if (this.answers.length === this.numberOfAnswer) {
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
    this.numberOfAnswer = 0;
    this.checkLongOfAnswer = false;
  }
}
