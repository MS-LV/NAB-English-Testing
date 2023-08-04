import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../services/config.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthorizationMessage} from "../../interface/login";
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {IServerConfig} from "../../interface/configs";
import {catchError, Observable, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    serverConfig: IServerConfig;

    constructor(private config: ConfigService,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit() {
        const serverConfigs = this.config.serverConfig()
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    return this.errorHandler(err)
                })
            )
            .subscribe((configs) => {
                if (configs) {
                    this.serverConfig = configs;
                }
            });
    }

    changeOptions() {
        this.config.updateServerConfig(this.serverConfig)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    return this.errorHandler(err)
                })
            )
            .subscribe((configs) => {
                if (configs) {
                    this.serverConfig = configs;
                }
            });
    }

    private openSnackBar(data: AuthorizationMessage) {
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
