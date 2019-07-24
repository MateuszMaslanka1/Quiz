import { Component, OnInit } from '@angular/core';
import { ConnectToJsonServerService } from '../connect-to-json-server.service';
import * as rxjs from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private services: ConnectToJsonServerService, private router: Router) { }

  protected quantityOfquestions: number;

  ngOnInit() {
    this.services.getQuestionsFromJsonServer().subscribe(response => {
      this.quantityOfquestions = response.length;
    })
    this.services.getTimeFromJsonServer().subscribe(response => {
      console.log(response);
    });
  }
}
