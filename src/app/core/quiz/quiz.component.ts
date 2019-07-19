import {Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {ConnectToJsonServerService} from '../connect-to-json-server.service';
import {CheckCorectAnswerService} from '../check-corect-answer.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

  @ViewChild('myRadio', { static: true }) myRadioElementRef: ElementRef;

  constructor(private jsonServerService: ConnectToJsonServerService, private checkCorectAnswer: CheckCorectAnswerService, private ren: Renderer2 ) { }

  questionsForShow = [];
  items;
  indexForNextQuestion = 0;
  answer: string;
  isChecked=false;

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
      this.answer = null;
     this.indexForNextQuestion++;
     if (this.indexForNextQuestion === this.questionsForShow.length) {
       this.indexForNextQuestion = 0;
     }
   }
  previousQuestion() {
    this.answer = null;
    this.indexForNextQuestion--;
    if (this.indexForNextQuestion < 0) {
      this.indexForNextQuestion = this.questionsForShow.length - 1;
    }
  }
  takeAnsweres() {
    const getResoult = this.checkCorectAnswer.checkAnswer(this.questionsForShow[this.indexForNextQuestion], this.answer);
    const arrayWithUserAnswer = this.checkCorectAnswer.checkHowMany(this.questionsForShow, this.answer, this.indexForNextQuestion);

    console.log(arrayWithUserAnswer);
  }
}
