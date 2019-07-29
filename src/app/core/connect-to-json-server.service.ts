import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Quizdata } from '../model/quiz-data/quiz-data';
import {delay, map, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConnectToJsonServerService {

  constructor(private http: HttpClient) { }

  userAnswer: string;

  getQuestionsFromJsonServer() {
      return this.http.get<Array<Quizdata>>('http://localhost:3000/questions').pipe(
        tap(response => console.log(response))
      );
  }

  getTimeLimit() {
    return this.http.get('http://localhost:3000/MinutesTime').pipe( map(res => res[0]));
  }

  putModeFromJsonServer(flagFromWelcome) {
    return this.http.put('http://localhost:3000/NegativeMode/1', {flag: flagFromWelcome}).subscribe(data => {
    }, error => {
      console.log(error.message);
      console.log(error.status);
    });
  }

   getModeFromJsonServer() {
     return this.http.get('http://localhost:3000/NegativeMode').pipe(map(res => res[0].flag));
   }
}
