import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Quizdata } from '../model/quiz-data/quiz-data';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectToJsonServerService {

  constructor(private http: HttpClient) { }

  userAnswer: string;

  getQuestionsFromJsonServer() {
      return this.http.get<Array<Quizdata>>('http://localhost:3000/questions');
  }

  getTimeFromJsonServer() {
    return this.http.get('http://localhost:3000/MinutesTime').pipe(map(res => res[0]));
  }

  getModeFromJsonServer() {
    return this.http.get('http://localhost:3000/NegativeMode').pipe(map(res => res[0]));
  }

}
