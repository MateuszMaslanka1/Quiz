import {Component, OnInit} from '@angular/core';
import {JsonServerService} from '../json-server.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private services: JsonServerService, private jsonServerService: JsonServerService) { }

  protected quantityOfQuestions: number;
  protected timeForUser: number;
  public color = 'accent';

  ngOnInit() {
    this.color = 'accent';
    this.services.getQuestionsFromJsonServer().subscribe(response => {
      this.quantityOfQuestions = response.length;
    });

    this.services.getTimeLimit().subscribe(response => {
      this.timeForUser = response;
    });
  }

   onChange(isChecked) {
     this.jsonServerService.putModeFromJsonServer(isChecked.checked);
   }
}
