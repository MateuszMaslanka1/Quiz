import {Component, OnInit} from '@angular/core';
import {JsonServerService} from '../json-server.service';
import swal from 'sweetalert2';
import {FormControl, Validators} from '@angular/forms';
import {CheckAllAnswersAreInscribedService} from './check-all-answers-are-inscribed.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  arrayOfQuantityInput = Array;
  maxQuantityOfAnswer = 6;
  numberOfAnswer = 0;
  validationForInput: FormControl[] = [];
  checkLongOfAnswer = false;
  question = '';
  answers: string[] = [];
  correctAnswer = null;
  validForTextArea = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  private ObjWithQuestion = {};

  constructor(private connectToJsonServerService: JsonServerService,
              private checkAllAnswersAreInscribedService: CheckAllAnswersAreInscribedService) {
  }

  ngOnInit() {
    this.listForInputValid();
  }

  checkLongAnswer() {
    this.checkLongOfAnswer = (this.numberOfAnswer > 1 && this.question.length > 2) ?
      this.checkAllAnswersAreInscribedService.checkLenghtOfAnswers(this.answers, this.numberOfAnswer) :
      false;
  }

  deleteAnswer(indexOfAnswer) {
    swal.fire({
      title: 'Czy napewno chesz usunąć odpowiedź',
      text: 'kliknij na przycisk',
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33'
    }).then((result) => {
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
    if (this.correctAnswer === null) {
      swal.fire({title: 'Zaznacz odpowiedź na przycisku obok pola tekstowego', text: 'kliknij na przycisk', type: 'info'});
    } else {
      swal.fire({
        title: 'Czy napewno chesz zatwierdzić pytania',
        text: 'kliknij na przycisk', type: 'warning',
        showCancelButton: true, cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.value) {
          this.ObjWithQuestion = {
            question: this.question,
            answers: this.answers,
            correctAnswer: this.correctAnswer,
            userAnswer: null
          };
          this.connectToJsonServerService.sendNewQuestionToJsonServer(this.ObjWithQuestion);
          this.clearAll();
        }
      });
    }
  }

  clearAll() {
    this.answers = [];
    this.validForTextArea = new FormControl();
    for (let i = 0; i < this.maxQuantityOfAnswer; i++) {
      this.validationForInput[i] = new FormControl('value', Validators.minLength(2));
    }
    this.question = null;
    this.correctAnswer = null;
    this.numberOfAnswer = 0;
    this.checkLongOfAnswer = false;
  }

  listForInputValid() {
    for (let i = 0; i < this.maxQuantityOfAnswer; i++) {
      this.validationForInput[i] = new FormControl('value', Validators.minLength(2));
    }
  }
}
