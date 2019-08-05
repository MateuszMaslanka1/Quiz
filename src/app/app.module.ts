import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './core/welcome/welcome.component';
import {HttpClientModule} from '@angular/common/http';
import {QuizComponent} from './core/quiz/quiz.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTooltipModule,
  MatIconModule
} from '@angular/material';
import {SummaryComponent} from './core/summary/summary.component';
import {EndComponent} from './core/end/end.component';
import {TimeComponent} from './core/time/time.component';
import {MatTableModule} from '@angular/material/table';
import {TableComponent} from './core/table/table.component';
import {AddQuestionComponent} from './core/add-question/add-question.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    QuizComponent,
    SummaryComponent,
    EndComponent,
    TimeComponent,
    TableComponent,
    AddQuestionComponent
  ],
  imports: [
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
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
    MatFormFieldModule,
  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
