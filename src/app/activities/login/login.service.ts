import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ConfigService} from "../../services/config.service";
import {HelperService} from "../../services/helper.service";
import {AuthorizationData} from "../../interface/registration";
import {map, Observable, take} from "rxjs";
import {AuthorizationMessage, LoginControls, RegistrationControls} from "../../interface/login";

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
    const url = this.config.upConfig.registryURL;
    return this.http.post<AuthorizationData>(url, body, {observe: 'response'})
      .pipe(
        take(1),
        map((response: HttpResponse<AuthorizationData>) => {
          const localeStorage = this.helper.authDataCompress(response);
          this.helper.saveLocalStorage(localeStorage);
          this.helper.setAuthStatus(true);
          const message = {
            statusCode: 200,
            message: 'Успешной регистрации!',
            status: 'success'
          }
          return message;
        })
      );
  }

  login(body: LoginControls): Observable<AuthorizationMessage> {
    const url = this.config.upConfig.loginURL;
    return this.http.post<AuthorizationData>(url, body, {
      observe: 'response'
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
        })
      )
  }

}
