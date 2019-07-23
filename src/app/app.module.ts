import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './core/welcome/welcome.component';
import {HttpClientModule} from '@angular/common/http';
import { QuizComponent } from './core/quiz/quiz.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatRadioModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { SummaryComponent } from './core/summary/summary.component';
import { EndComponent } from './core/end/end.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    QuizComponent,
    SummaryComponent,
    EndComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule
  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
