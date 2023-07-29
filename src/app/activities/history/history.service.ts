import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../services/config.service";
import {HistoryResponse} from "../../interface/history";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient,
              private config: ConfigService) {
  }

  getHistory(): Observable<HistoryResponse[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`
    });
    return this.http.get<HistoryResponse[]>(this.config.upConfig!.history, {headers})
      .pipe(
        map((cards) => {
          cards.forEach((card) => {
            const {correct, incorrect} = card;
            const score = (correct.length / (correct.length + incorrect.length)) * 100;
            const result = score >= 90 ? 5 : score >= 65 ? 4 : score >= 50 ? 3 : score >= 30 ? 2 : 1;
            card.score = result;
          })
          return cards;
        })
      )
  }
}
