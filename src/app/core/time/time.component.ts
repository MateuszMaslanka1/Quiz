import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CheckTimeService} from '../check-time.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit  {

  constructor(protected checkTime: CheckTimeService) { }

  ngOnInit() {
    this.checkTime.startTime();
  }
}
