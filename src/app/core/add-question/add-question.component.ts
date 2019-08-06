import {Component, OnInit} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  constructor(private formBilder: FormBuilder) { }

  Arr = Array;
  num = 1;
  getAnswer: string;
  answer: string[] = [];

  ngOnInit() {
  }

  addQuestion() {
    console.log(this.answer);
    this.num++;
  }
}
