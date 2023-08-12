import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../services/config.service";
import {IQuestionList} from "./admin.interface";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private config: ConfigService,
              private http: HttpClient) {
  }

  saveQuestion(body: IQuestionList[]): Observable<any> {
    const url = this.config.upConfig.upload
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`
    });
    return this.http.post(url, body, {headers});
  }
}
