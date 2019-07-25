import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CheckCorectAnswerService} from '../check-corect-answer.service';
import { ConnectToJsonServerService } from '../connect-to-json-server.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

  constructor(private checkCorectAnswer: CheckCorectAnswerService,  private jsonServerService: ConnectToJsonServerService) { }

  listWithQuestionAndAnswer = [];
  columnsToDisplay = [];
  before = 'before';
  getFlagFromJsonSever: string;

  ngOnInit() {
    this.jsonServerService.getModeFromJsonServer().subscribe(response => {
      this.getFlagFromJsonSever = response;
    });
    this.listWithQuestionAndAnswer = this.checkCorectAnswer.getQuestionAndAnswer();
    this.columnsToDisplay = ['value.id', 'value.question', 'value.answers', 'value.userAnswer'];
  }

  getFlag() {
    console.log(this.getFlagFromJsonSever);
  }
}
