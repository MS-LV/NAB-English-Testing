import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EverydayService} from "./everyday.service";
import {QuestionCardComponent} from "./question-cards/question-card.component";
import {DictionariesQuestion} from "../../interface/dictionaries-question";
import {catchError, interval, Observable, of, Subscription, takeWhile, tap} from "rxjs";
import {ConfigService} from "../../services/config.service";
import {AuthorizationMessage} from "../../interface/login";
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'app-everyday',
    templateUrl: './everyday.component.html',
    styleUrls: ['./everyday.component.scss']
})
export class EverydayComponent implements OnInit, OnDestroy {
    @ViewChild('questions', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;
    studentInfo: FormGroup;
    blocks: string[] = ['A', 'B', 'C'];
    isAuthorized = false;
    expiredTime: number;
    questions: DictionariesQuestion[]

    private subscriptions: Subscription[] = [];

    constructor(
        public service: EverydayService,
        public config: ConfigService,
        private _snackBar: MatSnackBar,
        private resolver: ComponentFactoryResolver
    ) {
        this.studentInfo = new FormGroup({
            group: new FormControl('', [Validators.required]),
            block: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {

    }

    startDictionaryTesting(event: Event): void {
        this.loadCards();
        this.startTimer();
        this.expiredTime = this.config?.serverConfig?.dictionaryExpired;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }

    private startTimer() {
        interval(1000)
            .pipe(
                tap(() => {
                    if (this.expiredTime / 60000 <= 0) {
                        const message: AuthorizationMessage = {message: 'Time Expired', status: 'error'}
                        this.openSnackBar(message);
                        const headers = new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.config.accessToken}`
                        });
                        this.service.saveHistory(null, headers, true).subscribe();
                    }
                }),
                takeWhile((num) => this.expiredTime > 0)
            )
            .subscribe(() => {
                this.expiredTime -= 1000;
            });
    }

    private loadCards() {
        const formValue = this.studentInfo.value
        const question = this.service.getDictationQuestion(formValue.block, formValue.group)
            .pipe(catchError((err: HttpErrorResponse) => {
                return this.errorHandler(err);
            }))
            .subscribe((cards) => {
                if (cards) {
                    if (cards.length > 50) {
                        cards.length = 50;
                    }
                    this.questions = cards;
                    this.isAuthorized = true;
                    // this.addQuestions(cards);
                }
            });
        this.subscriptions.push(question);
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

}
