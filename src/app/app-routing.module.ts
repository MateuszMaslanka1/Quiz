import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './core/welcome/welcome.component';
import {QuizComponent} from './core/quiz/quiz.component';
import {SummaryComponent} from './core/summary/summary.component';
import {EndComponent} from './core/end/end.component';


const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'quiz/:id', component: QuizComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'end', component: EndComponent},
  {path: '**', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
