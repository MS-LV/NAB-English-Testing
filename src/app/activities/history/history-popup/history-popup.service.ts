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
        const allTests = history.data.reduce((acc, item) => {
          if (!item?.correct) {
            return acc;
          }
          return acc += item.correct.length + item.incorrect.length
        }, 0);
        const correctTests = history.data.reduce((acc, item) => {
          if (!item?.correct) {
            return acc;
          }
          return acc += item.correct.length
        }, 0);
        const percent = (correctTests / (allTests)) * 100;
        console.log('percent', percent);
        const score = percent >= 85 ? 5 : percent >= 65 ? 4 : percent >= 50 ? 3 : percent >= 30 ? 2 : 1;
        history.score = score;
        return history
      }))
  }
}
