import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HistoryResponse} from "../../../interface/history";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../../services/config.service";

@Injectable({
  providedIn: 'root'
})
export class HistoryPopupService {

  constructor(private http: HttpClient,
              private config: ConfigService) {
  }

  unitHistory(historyID: string): Observable<HistoryResponse> {
    const url = `${this.config.upConfig.history}/${historyID}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`
    });
    return this.http.get<HistoryResponse>(url, {headers})
      .pipe(map(history => {
        let allBalls = 0;
        history.data.forEach((item) => {
          if (history.type === 'everyday') {
            allBalls += item.correct.length;
            return
          }
          if (item.correct) {
            const allScore = item.correct.length + item.incorrect.length;
            const ball = 20 / allScore;
            item.ballScore = ball * item.correct.length;
            allBalls += ball * item.correct.length;
          }
        })
        const allTests = history.data.reduce((acc, item) => {
          if (!item?.correct) {
            item.ballScore
            return acc;
          }
          return acc += item.correct.length + item.incorrect.length;
        }, 0);
        const correctTests = history.data.reduce((acc, item) => {
          if (!item?.correct) {
            return acc;
          }
          return acc += item.correct.length;
        }, 0);
        history.score = allBalls;
        return history
      }))
  }
}
