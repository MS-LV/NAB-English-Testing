import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {AuthorizationData} from "../interface/registration";
import {BehaviorSubject, catchError, map, Observable, of, take, tap} from "rxjs";
import {ConfigService} from "./config.service";
import {Router} from "@angular/router";
import {DictionaryChecker} from "../interface/dictionaries-question";
import {GrammarChecker} from "../components/grammar/grammar.interface";
import {ReadingChecker} from "../components/reading/reading.interface";
import {ListeningChecker} from "../components/listening/listening.interface";
import {WritingChecker} from "../components/writing/writing.interface";

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
          this.router.navigate(['/login']).then();
          return of(false);
        })
      )
  }

  checkerDictionary(questions: any[], answer: any[], type: string): DictionaryChecker {
    const correct = questions.filter((item, i) => item.english.toLowerCase() === answer[i]);
    const incorrect = questions.filter((item, i) => item.english.toLowerCase() !== answer[i]);
    const result = {correct, incorrect, type};
    return result;
  }

  checkerGrammar(questions: any[], answer: string[], type: string): GrammarChecker | ReadingChecker | ListeningChecker | DictionaryChecker | WritingChecker {
    const correct = questions.filter((item, i) => item.answer.toLowerCase().trim() === answer[i].toLowerCase().trim());
    const incorrect = questions.filter((item, i) => item.answer.toLowerCase().trim() !== answer[i].toLowerCase().trim());
    const result = {correct, incorrect, type};
    return result;
  }

  shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  userLogout() {
    localStorage.clear();
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']).then();
  }

  removeUser(id: string): Observable<any> {
    const url = `${this.config.upConfig.deleteUser}/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`
    });
    return this.http.delete(url, {headers})
      .pipe(take(1),
        tap(() => {
          this.userLogout();
        })
      );
  }
}
