import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
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

  getHistory(user: string): Observable<HistoryResponse[]> {
    const url = this.config.upConfig.history;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`,
      'user': user ?? ''
    });
    return this.http.get<HistoryResponse[]>(url, {headers})
  }
}
