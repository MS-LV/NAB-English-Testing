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
import {HistoryPopupComponent} from "./activities/history/history-popup/history-popup.component";
import {IsStudentGuard} from "./guard/is-student.guard";
import {AdminComponent} from "./activities/admin/admin.component";
import {IsAdminGuard} from "./guard/is-admin.guard";

const routes: Routes = [
  {path: '', redirectTo: '/dictionary', pathMatch: 'full'},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, IsAdminGuard]},
  {path: 'testing', component: TestingComponent, canActivate: [AuthGuard, IsStudentGuard]},
  {path: 'dictionary', component: EverydayComponent, canActivate: [AuthGuard, IsStudentGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
  {path: 'history/:id', component: HistoryPopupComponent, canActivate: [AuthGuard]},
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
