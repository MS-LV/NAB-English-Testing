import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, mergeMap, Observable, of} from "rxjs";
import {HistoryResponse} from "../../../interface/history";
import {HistoryPopupService} from "./history-popup.service";
import {ConfigService} from "../../../services/config.service";
import {AuthorizationMessage} from "../../../interface/login";
import {SnackbarComponent} from "../../../components/snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-history-popup',
  templateUrl: './history-popup.component.html',
  styleUrls: ['./history-popup.component.scss']
})
export class HistoryPopupComponent {
  currentHistory: HistoryResponse;

  constructor(public config: ConfigService,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private service: HistoryPopupService) {
    this.route.params
      .pipe(
        mergeMap((param) => {
          return this.service.unitHistory(param['id']);
        }),
        catchError((err:HttpErrorResponse) => {
          return this.errorHandler(err);
        })
      )
      .subscribe((item) => {
        if (item) {
          this.currentHistory = item;
        }
      });
  }

  ngOnInit() {
  }

  openSnackBar(data: AuthorizationMessage) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data
    });
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
}
