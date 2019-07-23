import { Injectable } from '@angular/core';
import { ConnectToJsonServerService } from './connect-to-json-server.service';
import {observable, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckTimeService {

  constructor(private jsonServerService: ConnectToJsonServerService)  { }

  subjectSecond = new Subject();
  subjectMinute = new Subject();

  startTime() {
     this.jsonServerService.getTimeFromJsonServer().subscribe(response => {
     let second = 0;
     let minute = 0;
     const myTime = setInterval(() => {
          if (second < 59) {
            second++;
          } else {
            second = 0;
            minute++;
          }
          this.subjectSecond.next(second);
          this.subjectMinute.next(minute);
     }, 1000);

     setTimeout(() => {
       alert('koniec czasu');
       clearInterval(myTime);
       }, +response * 60000);
    });
  }
}
