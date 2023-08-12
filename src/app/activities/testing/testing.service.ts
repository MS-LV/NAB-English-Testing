import {Injectable} from '@angular/core';
import {Observable, take, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GrammarQuestion, ListeningQuestions, ReadingQuestion, WritingQuestion} from "./testing.interface";
import {DictionariesQuestion} from "../../interface/dictionaries-question";
import {ConfigService} from "../../services/config.service";
import {HelperService} from "../../services/helper.service";
import {Router} from "@angular/router";
import {HistoryResponse} from "../../interface/history";

@Injectable({
  providedIn: 'root'
})
export class TestingService {
  testInfo: { block: string; group: string };
  currentCard: GrammarQuestion[] | DictionariesQuestion[] | ListeningQuestions[] | WritingQuestion[] | ReadingQuestion[];
  saveData: any[] = [];

  // saveData:any[] = [];


  constructor(private http: HttpClient,
              private config: ConfigService,
              private helper: HelperService,
              private router: Router) {
  }

  loadCard(url: string, block: string, group: string): Observable<GrammarQuestion[]
    | DictionariesQuestion[]
    | ListeningQuestions[]
    | WritingQuestion[]
    | ReadingQuestion[]> {
    if (!url) {
      return this.saveHistory();
    }
    this.testInfo = {block, group};
    const requestURL = `${this.config.upConfig.testing}/${url}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`,
      'block': block,
      'level': this.config.userInfo.userLevel
    });
    return this.http.get<GrammarQuestion[]
      | DictionariesQuestion[]
      | ListeningQuestions[]
      | WritingQuestion[]
      | ReadingQuestion[]>(requestURL, {headers})
      .pipe(
        take(1),
        tap((item) => {
          const shuffleArray = this.helper.shuffleArray(item as any[]);
          if (shuffleArray.length > 20) {
            shuffleArray.length = 20;
          }
          this.currentCard = shuffleArray
        })
      )
  }

  saveHistory(): Observable<any> {
    const url = this.config.upConfig.history;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`
    });
    const body = {
      ...this.testInfo,
      data: this.saveData,
      correct: [],
      incorrect: [],
      type: 'exam'
    }
    return this.http.post<HistoryResponse>(url, body, {headers})
      .pipe(
        take(1),
        tap((res) => {
          this.clear();
          return this.router.navigate(['/history', res._id]);
        }));
  }

  clear() {
    this.saveData = [];
  }
}
