import {Component, OnInit} from '@angular/core';
import {ConnectToJsonServerService} from '../connect-to-json-server.service';
import {CheckCorectAnswerService} from '../check-corect-answer.service';
import {GoToQuestionWithoutAnswerService} from '../go-to-question-without-answer.service';
import {CheckTimeService} from '../check-time.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit  {

  constructor(private jsonServerService: ConnectToJsonServerService, private checkCorectAnswer: CheckCorectAnswerService,
              private goToQuestionWithoutAnswer: GoToQuestionWithoutAnswerService, private checkTime: CheckTimeService,
              private route: ActivatedRoute, private router: Router) { }

  private questionsForShow = [];
  private items;
  private indexForNextQuestion = 0;
  private answer: string;
  private isChecked = false;
  private parametersFromLink: string;

  ngOnInit() {
    this.parametersFromLink = this.route.snapshot.url[1].path;
    this.router.navigate([`../quiz/${this.parametersFromLink}`]);
    this.indexForNextQuestion = +this.parametersFromLink;
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
      this.answer = this.questionsForShow[this.indexForNextQuestion].value.userAnswer;
    }
  }

  nextQuestion() {
    this.indexForNextQuestion++;
    this.router.navigate([`../quiz/${this.indexForNextQuestion}`]);
    if (this.indexForNextQuestion === this.questionsForShow.length) {
       this.indexForNextQuestion = this.questionsForShow.length - 1;
     }
    this.answer = this.questionsForShow[this.indexForNextQuestion].value.userAnswer;
   }

  previousQuestion() {
    this.indexForNextQuestion--;
    this.router.navigate([`../quiz/${this.indexForNextQuestion}`]);
    if (this.indexForNextQuestion === 0) {
      this.indexForNextQuestion = 0;
    }
    this.answer = this.questionsForShow[this.indexForNextQuestion].value.userAnswer;
  }

  takeAnsweres() {
   // const getResoult = this.checkCorectAnswer.checkAnswer(this.questionsForShow[this.indexForNextQuestion], this.answer);
    this.checkCorectAnswer.checkUserChoose(this.questionsForShow, this.answer, this.indexForNextQuestion);
  }

  chengeQuestion() {
    const goIndex = this.goToQuestionWithoutAnswer.goToQuestion(this.questionsForShow, this.indexForNextQuestion);
    if (goIndex !== null) {
      this.answer = this.questionsForShow[goIndex].value.userAnswer;
      this.indexForNextQuestion = goIndex;
      this.router.navigate([`../quiz/${this.indexForNextQuestion}`]);
    }
  }
}
