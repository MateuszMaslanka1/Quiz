import { Component, OnInit } from '@angular/core';
import { ConnectToJsonServerService } from '../connect-to-json-server.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(services: ConnectToJsonServerService) { }

  ngOnInit() {
    
  }

}
