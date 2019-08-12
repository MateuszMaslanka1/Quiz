import {Injectable} from '@angular/core';
import {JsonServerService} from './json-server.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  public time$ = new Subject();
  private isRunning = false;
  private getFlagFromJsonSever: string;
  private interval: number;

  constructor(private jsonServerService: JsonServerService, private router: Router)  { }

  startTimer() {
    this.jsonServerService.getPenaltyPoitsMode().subscribe(timelimit  => {
      this.getFlagFromJsonSever = timelimit ;
    });
    if (this.isRunning === false) {
      this.isRunning = true;
      this.jsonServerService.getTimeLimit().subscribe(timelimit => {
        this.decreaseTimeLeft(timelimit);
      });
     }
  }

  decreaseTimeLeft(timelimit) {
    let second;
    let minute;
    let time;
    let timeLeft = +timelimit * 60;
    this.interval = setInterval(() => {
      minute = timeLeft / 60;
      second = timeLeft % 60;
      minute = minute < 10 ? '0' + minute : minute;
      second = second < 10 ? '0' + second : second;
      time = minute < 10 ?  '0' + Math.trunc(minute) + ' minuta ' + ': ' + second + ' sekund' :
        Math.trunc(minute) + ' minuta ' + ': ' + second + ' sekund';
      this.time$.next(time);
      if (--timeLeft < 0) {
        this.prepareTimeString();
      }
    }, 1000);
  }

  prepareTimeString() {
    clearInterval(this.interval);
    swal.fire('Czas się skończył', 'kliknij na przycisk', 'warning').then(() => {
      this.router.navigate(['../end'], {queryParams: {flag: this.getFlagFromJsonSever}});
    });
  }

  StopTimer() {
    clearInterval(this.interval);
  }
}

