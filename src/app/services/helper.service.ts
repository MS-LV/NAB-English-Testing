import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {AuthorizationData} from "../interface/registration";
import {BehaviorSubject, catchError, map, Observable, of, take} from "rxjs";
import {ConfigService} from "./config.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private router: Router
  ) {
  }

  saveLocalStorage(data: any) {
    for (const key in data) {
      localStorage.setItem(key, JSON.stringify(data[key]));
    }
  }

  removeLocalStorage(data: any) {
    for (const key in data) {
      localStorage.removeItem(key);
    }
  }

  authDataCompress(response: HttpResponse<AuthorizationData>) {
    const responseBody = <AuthorizationData>response.body;
    const localStorageData = {
      accessToken: responseBody.accessToken,
      userInfo: {
        ...responseBody.user,
        userLevel: responseBody.status.level,
        userRole: responseBody.status.role
      }
    }
    return localStorageData;
  }

  setAuthStatus(status: boolean): void {
    this.isAuthenticated.next(status);
  }

  checkUser(): Observable<boolean> {
    const accessToken = (localStorage.getItem('accessToken') as string)?.replace(/[\"\']/gi, '');
    const url = this.config.upConfig!.isAuthorized;
    const body = {accessToken};
    return this.http.post(url, body)
      .pipe(
        take(1),
        map((item) => {
          this.setAuthStatus(true);
          return true;
        }),
        catchError((error) => {
          this.setAuthStatus(false);
          this.router.navigate(['/login']);
          return of(false);
        })
      )
  }
}
