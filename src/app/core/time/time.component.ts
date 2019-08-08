import {Component, OnInit} from '@angular/core';
import {TimeService} from '../time.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit  {

  constructor(protected checkTime: TimeService) { }

  ngOnInit() {
    this.checkTime.startTimer();
  }
}
