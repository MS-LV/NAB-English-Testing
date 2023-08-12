import {Injectable} from '@angular/core';
import {Observable, take} from "rxjs";
import {IUserList} from "./user-list.interface";
import {ConfigService} from "../../services/config.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private config: ConfigService,
              private http: HttpClient) {
  }

  getUsersList(): Observable<IUserList[]> {
    const url = this.config.upConfig.users;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`
    });
    return this.http.get<IUserList[]>(url, {headers});
  }

  updateUser(body: IUserList):Observable<any> {
    const url = this.config.upConfig.users + '/update';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`
    });
    return this.http.post(url, body, {headers})
      .pipe(take(1));
  }
}
