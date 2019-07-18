import { Component, OnInit } from '@angular/core';
import {ConnectToJsonServerService} from '../connect-to-json-server.service';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

  constructor(private services: ConnectToJsonServerService) { }

  questionsForShow = [];
  items;
  indexForNextQuestion = 0;

  ngOnInit() {
    this.services.getQuestionsFromJsonServer().subscribe(response => {
      for (const type in response) {
        this.items = {};
        this.items.key = type;
        this.items.value = response[type];
        this.questionsForShow.push(this.items);
      }
    });
    console.log(this.questionsForShow);
  }

  nextQuestion() {
    this.indexForNextQuestion++;
    if (this.indexForNextQuestion === this.questionsForShow.length) {
      this.indexForNextQuestion = 0;
    }
  }

  previousQuestion() {
    this.indexForNextQuestion--;
    if (this.indexForNextQuestion < 0) {
      this.indexForNextQuestion = this.questionsForShow.length - 1;
    }
  }
}
