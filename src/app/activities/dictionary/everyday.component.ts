import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EverydayService} from "./everyday.service";
import {QuestionCardComponent} from "./question-cards/question-card.component";
import {DictionariesQuestion} from "../../interface/dictionaries-question";
import {catchError, Observable, of, Subscription} from "rxjs";
import {ConfigService} from "../../services/config.service";
import {AuthorizationMessage} from "../../interface/login";
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

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
    dictionariesCards: DictionariesQuestion[] = [];

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

    addQuestions(cards: DictionariesQuestion[]): void {
        const factory = this.resolver.resolveComponentFactory(QuestionCardComponent);
        const componentRef = this.container.createComponent(factory);
        componentRef.instance.questions = cards;
    }

    studentInfoSubmit(event: Event): void {
        const form = <HTMLFormElement>event.currentTarget;
        const formValue = this.studentInfo.value
        const question = this.service.getDictationQuestion(formValue.block, formValue.group)
            .pipe(catchError((err: HttpErrorResponse) => {
                return this.errorHandler(err);
            }))
            .subscribe((cards) => {
                if (cards) {
                    this.isAuthorized = true;
                    this.addQuestions(cards);
                }
            });
        this.subscriptions.push(question);
    }

    openSnackBar(data: AuthorizationMessage) {
        this._snackBar.openFromComponent(SnackbarComponent, {
            duration: 5000,
            data
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());
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
