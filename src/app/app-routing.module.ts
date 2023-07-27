import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from "./activities/about/about.component";
import {ProfileComponent} from "./activities/profile/profile.component";
import {LoginComponent} from "./activities/login/login.component";
import {EverydayComponent} from "./activities/dictionary/everyday.component";
import {TestingComponent} from "./activities/testing/testing.component";
import {HistoryComponent} from "./activities/history/history.component";
import {ErrorComponent} from "./activities/error/error.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/dictionary', pathMatch: 'full'},
  {path: 'testing', component: TestingComponent, canActivate: [AuthGuard]},
  {path: 'dictionary', component: EverydayComponent},
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
