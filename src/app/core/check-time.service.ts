import {Injectable} from '@angular/core';
import {ConnectToJsonServerService} from './connect-to-json-server.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CheckTimeService {

  constructor(private jsonServerService: ConnectToJsonServerService, private router: Router)  { }

  public subjectTime = new Subject();
  private isRunning = false;
  private getFlagFromJsonSever: string;
  private interval: number;

  startTime() {
    this.jsonServerService.getModeFromJsonServer().subscribe(response => {
      this.getFlagFromJsonSever = response;
    });
    if (this.isRunning === false) {
      this.isRunning = true;
      this.jsonServerService.getTimeLimit().subscribe(timelimit => {
        let second;
        let minute;
        let time;
        let timer = +timelimit * 60;
        this.interval = setInterval(() => {
          minute = timer / 60;
          second = timer % 60;
          minute = minute < 10 ? '0' + minute : minute;
          second = second < 10 ? '0' + second : second;
          time = minute < 10 ?  '0' + Math.trunc(minute) + ' minuta ' + ': ' + second + ' sekund' :
          Math.trunc(minute) + ' minuta ' + ': ' + second + ' sekund';
          this.subjectTime.next(time);
          if (--timer < 0) {
            clearInterval(this.interval);
            swal.fire('Czas się skończył', 'kliknij na przycisk', 'warning').then(() => {
              this.router.navigate(['../end'], {queryParams: {flag: this.getFlagFromJsonSever}});
            });
          }
        }, 1000);
      });
     }
  }

  endTime() {
    clearInterval(this.interval);
  }
}

