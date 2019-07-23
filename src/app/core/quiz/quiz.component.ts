import {Component, OnInit} from '@angular/core';
import {ConnectToJsonServerService} from '../connect-to-json-server.service';
import {CheckCorectAnswerService} from '../check-corect-answer.service';
import {GoToQuestionWithoutAnswerService} from '../go-to-question-without-answer.service';
import {CheckTimeService} from '../check-time.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit  {

  constructor(private jsonServerService: ConnectToJsonServerService, private checkCorectAnswer: CheckCorectAnswerService,
              private goToQuestionWithoutAnswer: GoToQuestionWithoutAnswerService, private checkTime: CheckTimeService) { }

  questionsForShow = [];
  items;
  indexForNextQuestion = 0;
  answer: string;
  isChecked = false;

  ngOnInit() {
    if (this.checkCorectAnswer.getQuestionAndAnswer().length === 0) {
      this.jsonServerService.getQuestionsFromJsonServer().subscribe(response => {
        for (const type in response) {
          this.items = {};
          this.items.key = type;
          this.items.value = response[type];
          this.questionsForShow.push(this.items);
        }
      });
    } else {
      this.questionsForShow = this.checkCorectAnswer.getQuestionAndAnswer();
      this.answer = this.questionsForShow[0].value.userAnswer;
    }
  }

  nextQuestion() {
    this.indexForNextQuestion++;
    if (this.indexForNextQuestion === this.questionsForShow.length) {
       this.indexForNextQuestion = this.questionsForShow.length - 1;
     }
    this.answer = this.questionsForShow[this.indexForNextQuestion].value.userAnswer;
   }
  previousQuestion() {
    this.indexForNextQuestion--;
    if (this.indexForNextQuestion === 0) {
      this.indexForNextQuestion = 0;
    }
    this.answer = this.questionsForShow[this.indexForNextQuestion].value.userAnswer;
  }
  takeAnsweres() {
    const getResoult = this.checkCorectAnswer.checkAnswer(this.questionsForShow[this.indexForNextQuestion], this.answer);
    const arrayWithUserAnswer = this.checkCorectAnswer.checkUserChoose(this.questionsForShow, this.answer, this.indexForNextQuestion);
  }

  chengeQuestion() {
    const goIndex = this.goToQuestionWithoutAnswer.goToQuestion(this.questionsForShow, this.indexForNextQuestion);
    if (goIndex !== null) {
      this.answer = this.questionsForShow[goIndex].value.userAnswer;
      this.indexForNextQuestion = goIndex;
    }
  }
}
