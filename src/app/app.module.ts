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
import {DictionaryComponent} from './activities/dictionary/dictionary.component';
import {TestingComponent} from './activities/testing/testing.component';
import {HistoryComponent} from './activities/history/history.component';
import {ErrorComponent} from './activities/error/error.component';
import {MatRadioModule} from "@angular/material/radio";
import {ConfigService} from "./services/config.service";
import {HttpClientModule} from "@angular/common/http";
import {QuestionCardComponent} from "./activities/dictionary/question-cards/question-card.component";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    // activities
    AppComponent,
    AboutComponent,
    ProfileComponent,
    LoginComponent,
    // components
    SnackbarComponent,
    DictionaryComponent,
    TestingComponent,
    HistoryComponent,
    ErrorComponent,
    QuestionCardComponent
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
    MatCardModule
  ],
  providers: [
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
