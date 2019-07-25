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

  startTime() {
    this.jsonServerService.getModeFromJsonServer().subscribe(response => {
      this.getFlagFromJsonSever = response;
    });
    if (this.isRunning === false) {
      this.isRunning = true;
      this.jsonServerService.getTimeFromJsonServer().subscribe(timelimit => {
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
          clearInterval(myTime);
          alert('koniec czasu');
          this.router.navigate([`../end/${this.getFlagFromJsonSever}`]);
        }, +timelimit * 60000);
      });
    }
  }
}


// if (this.isRunning === false) {
//   this.isRunning = true;
//   console.log('tutaj zmieniam na true');
// } else {
//   console.log(this.isRunning);
// }
