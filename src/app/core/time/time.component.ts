import {Component, OnInit} from '@angular/core';
import {CheckTimeService} from '../check-time.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit  {

  constructor(private checkTime: CheckTimeService) { }

  ngOnInit() {
    this.checkTime.startTime();
  }
}
