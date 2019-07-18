import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './core/welcome/welcome.component';
import {QuizComponent} from './core/quiz/quiz.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'quiz', component: QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
