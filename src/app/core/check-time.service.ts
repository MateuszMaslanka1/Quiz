import { Injectable } from '@angular/core';
import {ConnectToJsonServerService} from './connect-to-json-server.service';

@Injectable({
  providedIn: 'root'
})
export class CheckTimeService {

  constructor(private jsonServerService: ConnectToJsonServerService)  { }

  startTime() {
    return this.jsonServerService.getTimeFromJsonServer().subscribe(response => {
     const myTime = setInterval(() => {
        const d = new Date();
        console.log(d.getSeconds());
      }, 1000);
     setTimeout(() => {
       alert('ok');
       clearInterval(myTime);
       }, +response * 60000);
    });
  }
}
