import {Component, OnInit} from '@angular/core';
import {CheckCorrectAnswerService} from '../check-correct-answer.service';
import {JsonServerService} from '../json-server.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

  private getFlagFromJsonSever: string;

  constructor(private checkCorectAnswer: CheckCorrectAnswerService,
              private jsonServerService: JsonServerService, private router: Router) { }

  ngOnInit() {
    this.jsonServerService.getPenaltyPoitsMode().subscribe(response => {
      this.getFlagFromJsonSever = response;
    });
  }

  getFlag() {
    swal.fire({title: 'Czy napewno chesz zakończyć', text: 'kliknij na przycisk', type: 'warning',
    showCancelButton: true, cancelButtonColor: '#d33'}).then((result) => {
      if (result.value) {
        this.router.navigate(['../end'], {queryParams: {flag: this.getFlagFromJsonSever}});
      }
    });
  }
  backToQuiz() {
    this.router.navigate([`../quiz/0`]);
  }
}

