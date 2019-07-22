import { Injectable } from '@angular/core';
import { ConnectToJsonServerService } from './connect-to-json-server.service';

@Injectable({
  providedIn: 'root'
})
export class CheckTimeService {

  constructor(private jsonServerService: ConnectToJsonServerService)  { }

  startTime() {
    return this.jsonServerService.getTimeFromJsonServer().subscribe(response => {
     let secondToMinute = 0;
     const myTime = setInterval(() => {
          console.log(secondToMinute);
          secondToMinute++;     
          if (secondToMinute === 60) {
            console.log(secondToMinute / 60);
            secondToMinute = 0;
          }   
     }, 1000);

     setTimeout(() => {
       alert('ok');
       clearInterval(myTime);
       }, +response * 60000);
    });
  }
}
