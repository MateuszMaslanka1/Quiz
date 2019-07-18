import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {HttpClientModule} from '@angular/common/http';
import { QuizComponent } from './quiz/quiz.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatRadioModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
