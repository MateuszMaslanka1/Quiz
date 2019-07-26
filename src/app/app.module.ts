import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './core/welcome/welcome.component';
import {HttpClientModule} from '@angular/common/http';
import { QuizComponent } from './core/quiz/quiz.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatTooltipModule,
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { SummaryComponent } from './core/summary/summary.component';
import { EndComponent } from './core/end/end.component';
import { TimeComponent } from './core/time/time.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    QuizComponent,
    SummaryComponent,
    EndComponent,
    TimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    MatTableModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
