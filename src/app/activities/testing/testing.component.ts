import {Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../services/config.service";
import {TestingService} from "./testing.service";
import {catchError, delay, interval, Observable, of, takeWhile, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthorizationMessage} from "../../interface/login";
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss', '../../components/styles/questions.scss']
})
export class TestingComponent implements OnInit {
  testingInfo: FormGroup = new FormGroup({
    group: new FormControl('', [Validators.required]),
    block: new FormControl('', [Validators.required])
  });
  page = '';
  blocks: string[] = ['A', 'B', 'C'];
  date = new Date();
  testSteps = ['grammar', 'reading', 'listening', 'dictionary', 'writing'];
  // testSteps = ['reading', 'reading', 'writing'];
  expiredTime = this.config.serverConfig.examExpired;

  private idxCard = 0;

  constructor(public config: ConfigService,
              public service: TestingService,
              private _snackBar: MatSnackBar,
              private element: ElementRef) {
    // this.startTestingSubmit();
  }

  ngOnInit() {
    this.service.saveData = [];
  }

  startTestingSubmit() {
    this.loadNextCards();
    this.startTimer();
  }

  onSubmitCards(evt: any) {
    this.loadNextCards();
  }

  private loadNextCards() {
    const {block, group} = this.testingInfo.value;
    this.service.loadCard(this.testSteps[this.idxCard], block, group)
      .pipe(catchError((err: HttpErrorResponse) => {
        return this.errorHandler(err);
      }))
      .subscribe((item) => {
        this.changePage();
        this.element.nativeElement.scrollTop = 0;
      });
  }

  private changePage() {
    this.page = this.testSteps[this.idxCard];
    this.idxCard++;
  }

  private openSnackBar(data: AuthorizationMessage) {
    const className = data.status === 'success' ? 'success' : 'error'
    this._snackBar.openFromComponent(SnackbarComponent, {
      panelClass: [className],
      duration: 5000,
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

  private startTimer() {
    interval(1000)
      .pipe(
        tap(() => {
          if (this.expiredTime / 60000 <= 0) {
            const message: AuthorizationMessage = {message: 'Time Expired', status: 'error'}
            this.openSnackBar(message);
            this.service.saveHistory(true).subscribe();
          }
        }),
        takeWhile((num) => this.expiredTime > 0)
      )
      .subscribe(() => {
        this.expiredTime -= 1000;
      });
  }
}
