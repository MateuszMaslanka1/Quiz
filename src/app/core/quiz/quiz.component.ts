import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JsonServerService} from '../json-server.service';
import {CheckCorrectAnswerService} from '../check-correct-answer.service';
import {GoToQuestionWithoutAnswerService} from '../go-to-question-without-answer.service';
import {TimeService} from '../time.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit  {

  @ViewChild('question', {static: false}) question: ElementRef;

  indexForNextQuestion = 0;
  loading = false;

  private questionsForShow = [];
  private items;
  private answer: string;
  private parametersFromLink: string;

  constructor(private jsonServerService: JsonServerService, private checkCorectAnswer: CheckCorrectAnswerService,
              private goToQuestionWithoutAnswer: GoToQuestionWithoutAnswerService,
              private router: Router, public checkTimeService: TimeService) { }

  ngOnInit() {
    // this.parametersFromLink = this.route.snapshot.url[1].path;
    this.router.navigate([this.router.url]);
    // this.router.navigate([`../quiz/${this.parametersFromLink}`]);
    // this.indexForNextQuestion = +this.parametersFromLink;
    this.indexForNextQuestion = +this.router.url.split('/').slice(-1)[0];
    if (this.checkCorectAnswer.getQuestionAndAnswer().length === 0) {
      this.jsonServerService.getQuestionsFromJsonServer().subscribe(response => {
        for (const type of Object.keys(response)) {
          this.items = {};
          this.items.key = type;
          this.items.value = response[type];
          this.questionsForShow.push(this.items);
        }
        this.loading = false;
        console.log(this.questionsForShow);
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

  changeAnmationForwardQustion() {
    this.question.nativeElement.className  = '';
     // tslint:disable-next-line:no-unused-expression
    this.question.nativeElement.offsetWidth; // reflow layout in all page and run animation in slider
    this.question.nativeElement.classList.add('animation-class-forward');
  }
  changeAnmationBackwardQuestion() {
    this.question.nativeElement.className = '';
    // tslint:disable-next-line:no-unused-expression
    this.question.nativeElement.offsetWidth; // reflow layout in all page and run animation in slider
    this.question.nativeElement.classList.add('animation-class-backward');
  }

}
