import {Component, OnInit} from '@angular/core';
import {JsonServerService} from '../json-server.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  color = 'accent';

  quantityOfQuestions: number;
  timeForUser: number;

  constructor(private services: JsonServerService) { }

  ngOnInit() {
    this.color = 'accent';
    this.services.getQuestionsFromJsonServer().subscribe(response => {
      this.quantityOfQuestions = response.length;
    });

    this.services.getTimeLimit().subscribe(response => {
      this.timeForUser = response;
    });
  }
}
