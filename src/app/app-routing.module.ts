import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from "./activities/about/about.component";
import {ProfileComponent} from "./activities/profile/profile.component";
import {LoginComponent} from "./activities/login/login.component";
import {DictionaryComponent} from "./activities/dictionary/dictionary.component";
import {TestingComponent} from "./activities/testing/testing.component";
import {HistoryComponent} from "./activities/history/history.component";
import {ErrorComponent} from "./activities/error/error.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {path: 'testing', component: TestingComponent, canActivate: [AuthGuard]},
  {path: 'dictionary', component: DictionaryComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
