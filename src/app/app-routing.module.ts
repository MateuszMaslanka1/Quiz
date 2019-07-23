import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './core/welcome/welcome.component';
import {QuizComponent} from './core/quiz/quiz.component';
import {SummaryComponent} from './core/summary/summary.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'summary', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
