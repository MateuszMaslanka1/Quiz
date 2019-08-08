import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {QuizData} from '../model/quiz-data';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JsonServerService {

  constructor(private http: HttpClient) { }

  getQuestionsFromJsonServer() {
    return this.http.get<Array<QuizData>>('http://localhost:3000/questions');
}

  getTimeLimit() {
    return this.http.get('http://localhost:3000/timeLimitMinutes').pipe( map(res => res[0]));
  }

  putModeFromJsonServer(flagFromWelcome: string) {
    return this.http.put('http://localhost:3000/NegativeMode/1', {flag: flagFromWelcome}).subscribe(data => {
    }, error => {
      console.log(error.message, error.status);
    });
  }

  getPenaltyPoitsMode() {
     return this.http.get('http://localhost:3000/penaltyPointsMode').pipe(map(res => res[0].flag));
   }

   sendNewQuestionToJsonServer(ObjWithQuestion) {
     console.log(ObjWithQuestion);
     return this.http.post('http://localhost:3000/questions', ObjWithQuestion).subscribe(data => {
        console.log(data);
      }, error => {
       console.log(error.message, error.status);
     });
   }
}
