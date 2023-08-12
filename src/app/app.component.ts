import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "./services/config.service";
import {HelperService} from "./services/helper.service";
import {catchError, Observable, of, Subscription} from "rxjs";
import {IServerConfig} from "./interface/configs";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthorizationMessage} from "./interface/login";
import {SnackbarComponent} from "./components/snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  elementNative: HTMLElement;
  title = 'NAB-English-Testing';
  device = '';
  isAuthorized = false;
  serverConfig: IServerConfig;
  private observable: Subscription[] = [];

  isMenuOpen: boolean = false;

  constructor(
    public config: ConfigService,
    private element: ElementRef,
    private helper: HelperService,
    private _snackBar: MatSnackBar
  ) {
    this.elementNative = this.element.nativeElement;
    this.init()
  }

  init() {
    this.device = this.config.deviceType;
    this.elementNative.classList.add(this.device);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit() {
    const checkUser = this.helper.checkUser().subscribe();
    const isAuthorized = this.helper.isAuthenticated
      .pipe(catchError((err: HttpErrorResponse) => {
        return this.errorHandler(err);
      }))
      .subscribe((next) => {
        if (this.isAuthorized !== next) {
          this.isAuthorized = next;
        }
      });

    this.config.serverConfig()
      .pipe(catchError((err: HttpErrorResponse) => {
        return this.errorHandler(err);
      }))
      .subscribe((config) => {
        this.serverConfig = config;
      });
    this.observable.push(isAuthorized, checkUser);
    this.helper.setAuthStatus(false);
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.device = this.config.deviceType;
  }

  ngOnDestroy() {
    this.observable.forEach((item) => item.unsubscribe());
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
