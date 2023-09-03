import {Component} from '@angular/core';
import {UserListService} from "./user-list.service";
import {IUserList} from "./user-list.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {AuthorizationMessage} from "../../interface/login";
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfigService} from "../../services/config.service";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  usersList: IUserList[];
  userRoles = ['STUDENT', 'TEACHER', 'ADMIN'];
  userLevel = ['beginner', 'elementary', 'pre intermediate', 'upper intermediate', 'advanced'];

  constructor(public config: ConfigService,
              private service: UserListService,
              private helper: HelperService,
              private _snackBar: MatSnackBar,) {
    this.service.getUsersList()
      .pipe(catchError((err: HttpErrorResponse) => {
        return this.errorHandler(err);
      }))
      .subscribe((usersList) => {
        this.usersList = usersList;
      });
  }

  changeRoles(select: HTMLSelectElement, user: IUserList) {
    const isChangeCurrent = this.config.userInfo.id === user._id;
    user.role = select.value;
    if (isChangeCurrent) {
      const canContinue = confirm('You want change current user data. You will logout from account');
      if (!canContinue) {
        return;
      }
    }
    this.service.updateUser(user)
      .pipe(catchError((err: HttpErrorResponse) => {
        return this.errorHandler(err);
      }))
      .subscribe(next => {
        if (this.config.userInfo.id === user._id) {
          this.helper.userLogout();
        }
      })
  }

  changeLevel(select: HTMLSelectElement, user: IUserList) {
    user.level = select.value;
    this.service.updateUser(user).subscribe();
  }

  cancelClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  private errorHandler(err: HttpErrorResponse): Observable<never> {
    if (err.statusText === 'Not Found') {
      const message = {
        statusCode: 404,
        status: 'error',
        message: 'Client Error 404 !'
      }
      this.openSnackBar(message);
      return of();
    }
    err.error.status = 'error';
    this.openSnackBar(err.error);
    return of();
  }

  private openSnackBar(data: AuthorizationMessage) {
    const className = data.status === 'success' ? 'success' : 'error'
    this._snackBar.openFromComponent(SnackbarComponent, {
      panelClass: [className],
      duration: 5000,
      data
    });
  }
}
