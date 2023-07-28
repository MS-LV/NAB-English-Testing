import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ConfigService} from "../../services/config.service";
import {map, Observable, take} from "rxjs";
import {DictionariesQuestion, DictionaryChecker} from "../../interface/dictionaries-question";
import {HelperService} from "../../services/helper.service";

@Injectable({providedIn: 'root'})
export class EverydayService {
  private testInfo: { group: string; block: string };

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private helper: HelperService) {
  }

  getDictationQuestion(block: string, group: string): Observable<DictionariesQuestion[]> {
    this.testInfo = {block, group};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`,
      'block': block,
      'level': this.config.userInfo.userLevel
    });
    return this.http.get<DictionariesQuestion[]>(this.config.upConfig.everyday, {headers})
      .pipe(
        take(1),
        map((cards) => {
          return this.helper.shuffleArray(cards);
        })
      );
  }

  saveToHistory(body: DictionaryChecker, headers: HttpHeaders): Observable<any> {
    body = {...body, group: this.testInfo.group, block: this.testInfo.block}
    return this.http.post(this.config.upConfig!.everyday, body, {headers})
      .pipe(take(1));
  }
}
