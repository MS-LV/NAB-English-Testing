import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AboutComponent} from './activities/about/about.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ProfileComponent} from './activities/profile/profile.component';
import {LoginComponent} from './activities/login/login.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SnackbarComponent} from "./components/snackbar/snackbar.component";
import {EverydayComponent} from './activities/dictionary/everyday.component';
import {TestingComponent} from './activities/testing/testing.component';
import {HistoryComponent} from './activities/history/history.component';
import {ErrorComponent} from './activities/error/error.component';
import {MatRadioModule} from "@angular/material/radio";
import {ConfigService} from "./services/config.service";
import {HttpClientModule} from "@angular/common/http";
import {QuestionCardComponent} from "./activities/dictionary/question-cards/question-card.component";
import {MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {GrammarComponent} from './components/grammar/grammar.component';
import {ReadingComponent} from './components/reading/reading.component';
import {ListeningComponent} from './components/listening/listening.component';
import {DictionaryComponent} from './components/dictionary/dictionary.component';
import {WritingComponent} from './components/writing/writing.component';
import {SpeakingComponent} from './components/speaking/speaking.component';
import {TestingDialogComponent} from './components/testing-dialog/testing-dialog.component';
import {HistoryPopupComponent} from './activities/history/history-popup/history-popup.component';
import {AdminComponent} from './activities/admin/admin.component';
import {MatSelectModule} from "@angular/material/select";
import {UserListComponent} from './activities/user-list/user-list.component';

@NgModule({
  declarations: [
    // activities
    AppComponent,
    AboutComponent,
    ProfileComponent,
    LoginComponent,
    // components
    SnackbarComponent,
    EverydayComponent,
    TestingComponent,
    HistoryComponent,
    ErrorComponent,
    QuestionCardComponent,
    GrammarComponent,
    ReadingComponent,
    ListeningComponent,
    DictionaryComponent,
    WritingComponent,
    SpeakingComponent,
    TestingDialogComponent,
    HistoryPopupComponent,
    AdminComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FontAwesomeModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatRadioModule,
    HttpClientModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
