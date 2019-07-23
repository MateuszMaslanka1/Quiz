import { Component, OnInit } from '@angular/core';
import {CheckCorectAnswerService} from '../check-corect-answer.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(private checkCorectAnswer: CheckCorectAnswerService) { }

  ngOnInit() {
    console.log(this.checkCorectAnswer.getQuestionAndAnswer());
  }

}
