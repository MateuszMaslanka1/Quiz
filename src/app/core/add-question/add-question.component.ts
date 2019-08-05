import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatRadioButton} from '@angular/material';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  constructor() { }

  Arr = Array;
  num = 4;

  ngOnInit() {
  }
}
