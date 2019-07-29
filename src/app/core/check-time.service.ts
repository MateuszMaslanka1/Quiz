import {Injectable} from '@angular/core';
import {ConnectToJsonServerService} from './connect-to-json-server.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckTimeService {

  constructor(private jsonServerService: ConnectToJsonServerService, private router: Router)  { }

  public subjectSecond = new Subject();
  public subjectMinute = new Subject();
  private isRunning = false;
  private getFlagFromJsonSever: string;
  private interval: number;
  private timeout: number;

  startTime() {
    this.jsonServerService.getModeFromJsonServer().subscribe(response => {
      this.getFlagFromJsonSever = response;
    });
    if (this.isRunning === false) {
      this.isRunning = true;
      this.jsonServerService.getTimeLimit().subscribe(timelimit => {
        let second;
        let minute;
        let timer = +timelimit * 60;
        let duration = +timelimit * 60;
        this.interval = setInterval(() => {
          // if (second < 59) {
          //   second++;
          // } else {
          //   second = 0;
          //   minute++;
          // }
          minute = timer / 60;
          second = timer % 60;
          minute = minute < 10 ? '0' + minute : minute;
          second = second < 10 ? '0' + second : second;
          let minuteConver = Math.floor(minute);
          this.subjectSecond.next(second);
          this.subjectMinute.next(minuteConver);
          if (--timer < 0) {
              timer = duration;
          }
        }, 1000);

        this.timeout = setTimeout(() => {
          clearInterval(this.interval);
          alert('koniec czasu');
          this.router.navigate([`../end/${this.getFlagFromJsonSever}`]);
        }, +timelimit * 60000);
      });
     }
  }

  endTime() {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }
}


// if (this.isRunning === false) {
//   this.isRunning = true;
//   console.log('tutaj zmieniam na true');
// } else {
//   console.log(this.isRunning);
// }
