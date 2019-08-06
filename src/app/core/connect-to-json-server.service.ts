import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Quizdata} from '../model/quiz-data/quiz-data';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConnectToJsonServerService {

  constructor(private http: HttpClient) { }

  userAnswer: string;

  getQuestionsFromJsonServer() {
    return this.http.get<Array<Quizdata>>('http://localhost:3000/questions').pipe(
        // tap(response => console.log(response))
      );
  }

  getTimeLimit() {
    return this.http.get('http://localhost:3000/MinutesTime').pipe( map(res => res[0]));
  }

  putModeFromJsonServer(flagFromWelcome: string) {
    return this.http.put('http://localhost:3000/NegativeMode/1', {flag: flagFromWelcome}).subscribe(data => {
    }, error => {
      console.log(error.message);
      console.log(error.status);
    });
  }

   getModeFromJsonServer() {
     return this.http.get('http://localhost:3000/NegativeMode').pipe(map(res => res[0].flag));
   }

   sendNewQuestionToJsonServer(ObjWithQuestion) {
     console.log(ObjWithQuestion);
     return this.http.post('http://localhost:3000/questions', ObjWithQuestion).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error.message);
        console.log(error.status);
      });
   }
}
