import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Quizdata } from '../model/quiz-data/quiz-data';

@Injectable({
  providedIn: 'root'
})
export class ConnectToJsonServerService {

  constructor(private http: HttpClient) { }

  getQuestionsFromJsonServer() {
      return this.http.get<Array<Quizdata>>('http://172.16.253.13:3000/questions');
  }

  getTimeFromJsonServer() {
    return this.http.get<Array<Quizdata>>('http://172.16.253.13:3000/questions');
  }

}
