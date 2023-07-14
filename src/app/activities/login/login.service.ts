import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ConfigService} from "../../services/config.service";
import {HelperService} from "../../services/helper.service";
import {AuthorizationData} from "../../interface/registration";
import {catchError, map, Observable, of, take} from "rxjs";
import {LoginControls, RegistrationControls, AuthorizationMessage} from "../../interface/login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private config: ConfigService,
    private helper: HelperService,
    private http: HttpClient,
  ) {

  }

  registration(body: RegistrationControls): Observable<AuthorizationMessage> {
    return this.http.post<AuthorizationData>(this.config.upConfig!.registryURL, body, {observe: 'response'})
      .pipe(
        take(1),
        map((response: HttpResponse<AuthorizationData>) => {
          const localeStorage = this.helper.authDataCompress(response);
          this.helper.saveLocalStorage(localeStorage);
          const message = {
            statusCode: 200,
            message: 'Успешной регистрации!',
            status: 'success'
          }
          return message;
        }), catchError((error: HttpErrorResponse) => {
          const message = {
            statusCode: 400,
            message: error.error.message,
            status: 'error'
          }
          return of(message);
        }),
      );
  }

  login(body: LoginControls): Observable<AuthorizationMessage> {
    return this.http.post<AuthorizationData>(this.config.upConfig!.loginURL, body, {
      observe: 'response',
      withCredentials: true
    })
      .pipe(
        take(1),
        map((response: HttpResponse<AuthorizationData>) => {
          const localeStorage = this.helper.authDataCompress(response);
          this.helper.saveLocalStorage(localeStorage);
          this.helper.setAuthStatus(true);
          const message = {
            statusCode: 200,
            message: 'Успешной вход!',
            status: 'success'
          }
          return message;
        }),
        catchError((error: HttpErrorResponse) => {
          const message = {
            statusCode: 400,
            message: error.error.message,
            status: 'error'
          }
          this.helper.setAuthStatus(false);
          return of(message);
        })
      )
  }
}
