import {Component, OnInit} from '@angular/core';
import {ConnectToJsonServerService} from '../connect-to-json-server.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  constructor(private connectToJsonServerService: ConnectToJsonServerService) { }

  Arr = Array;
  num = 1;
  answers = [];
  question: string;
  correctAnswer: number;
  ObjWithQuestion = {}

  ngOnInit() {
  }

  addQuestion() {
    this.num++;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.answers, event.previousIndex, event.currentIndex);
  }

  addQuestionToJsonServer() {
    swal.fire({
      title: 'Czy napewno chesz zakończyć', text: 'kliknij na przycisk', type: 'warning',
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
        this.answers = [];
        this.question = null;
        this.correctAnswer = null;
        this.num = 1;
      }
    });
  }
}
