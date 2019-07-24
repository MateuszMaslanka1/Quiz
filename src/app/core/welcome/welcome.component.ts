import { Component, OnInit } from '@angular/core';
import { ConnectToJsonServerService } from '../connect-to-json-server.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private services: ConnectToJsonServerService, private jsonServerService: ConnectToJsonServerService) { }

  protected quantityOfquestions: number;

  ngOnInit() {
    this.services.getQuestionsFromJsonServer().subscribe(response => {
      this.quantityOfquestions = response.length;
    })
    this.services.getTimeFromJsonServer().subscribe(response => {
      console.log(response);
    });
    this.jsonServerService.putModeFromJsonServer(false);
  }

   onChange(isChecked) {
     console.log(isChecked.checked);
     this.jsonServerService.putModeFromJsonServer(isChecked.checked);
   }
}
