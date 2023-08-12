import {Component} from '@angular/core';
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {AuthorizationMessage} from "../../interface/login";
import {Router} from "@angular/router";
import {catchError, Observable, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    durationInSeconds = 5;
    registrationForm: FormGroup;
    logInForm: FormGroup;
    passwordLength = 4
    isTeacher = false;

    constructor(
        private _snackBar: MatSnackBar,
        private service: LoginService,
        private route: Router
    ) {
        this.registrationForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            surename: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(this.passwordLength)]),
            accessKey: new FormControl('')
        });

        this.logInForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    submit(isLogin: boolean) {
        if (isLogin) {
            this.service.login(this.logInForm.value)
                .pipe(catchError((err: HttpErrorResponse) => {
                    return this.errorHandler(err);
                }))
                .subscribe((message) => {
                    if (!message) {
                    }
                    this.openSnackBar(message);
                    this.route.navigate(['/profile']).then();
                })
        } else {
            this.service.registration(this.registrationForm.value)
                .pipe(
                    catchError((err: HttpErrorResponse) => {
                        return this.errorHandler(err);
                    })
                )
                .subscribe((message) => {
                    if (!message) {
                        return;
                    }
                    this.openSnackBar(message);
                    this.route.navigate(['/profile']).then();
                })
        }
    }

    clear() {
        this.registrationForm.reset()
        this.logInForm.reset()
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
