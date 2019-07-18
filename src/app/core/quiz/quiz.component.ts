import {Component, OnInit} from '@angular/core';
import {ConnectToJsonServerService} from '../connect-to-json-server.service';
import {CheckCorectAnswerService} from '../check-corect-answer.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

  constructor(private jsonServerService: ConnectToJsonServerService, private checkCorectAnswer: CheckCorectAnswerService ) { }

  questionsForShow = [];
  items;
  indexForNextQuestion = 0;
  answer: string;

  ngOnInit() {
    this.jsonServerService.getQuestionsFromJsonServer().subscribe(response => {
      for (const type in response) {
        this.items = {};
        this.items.key = type;
        this.items.value = response[type];
        this.questionsForShow.push(this.items);
      }
    });
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
  takeAnswers() {
    const test = this.checkCorectAnswer.checkAnswer(this.questionsForShow[this.indexForNextQuestion], this.answer);
    console.log(test);
  }
}
