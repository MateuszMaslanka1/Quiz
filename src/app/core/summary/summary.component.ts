import {Component, OnInit} from '@angular/core';
import {CheckCorectAnswerService} from '../check-corect-answer.service';
import { ConnectToJsonServerService } from '../connect-to-json-server.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

  constructor(private checkCorectAnswer: CheckCorectAnswerService,
              private jsonServerService: ConnectToJsonServerService, private router: Router) { }

  private getFlagFromJsonSever: string;
  protected listWithQuestionAndAnswer = [];
  protected columnsToDisplay = [];

  protected before = 'before';

  ngOnInit() {
    this.jsonServerService.getModeFromJsonServer().subscribe(response => {
      this.getFlagFromJsonSever = response;
    });

    // this.listWithQuestionAndAnswer = this.checkCorectAnswer.getQuestionAndAnswer();
    // this.columnsToDisplay = ['value.id', 'value.question', 'value.answers', 'value.userAnswer'];
    console.log(this.columnsToDisplay);
  }

  getFlag() {
    swal.fire({title: 'Czy napewno chesz zakończyć', text: 'kliknij na przycisk', type: 'warning',
    showCancelButton: true, cancelButtonColor: '#d33'}).then((result) => {
      if (result.value) {
        this.router.navigate(['../end'], {queryParams: {flag: this.getFlagFromJsonSever}});
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Twoje zmiany zotały zachowane :)',
          'error'
        );
      }
    });
  }
  backToQuiz() {
    this.router.navigate([`../quiz/0`]);
  }
}

