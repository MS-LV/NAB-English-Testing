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
    const url = this.config.upConfig.everyday;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`,
      'block': block,
      'level': this.config.userInfo.userLevel
    });
    return this.http.get<DictionariesQuestion[]>(url, {headers})
      .pipe(
        take(1),
        map((cards) => {
          return this.helper.shuffleArray(cards);
        })
      );
  }

  saveToHistory(body: DictionaryChecker, headers: HttpHeaders): Observable<any> {
    const url = this.config.upConfig.everyday
    const {correct, incorrect, type} = body;
    const data = [{correct, incorrect, type}];
    const bodyParse = {data, group: this.testInfo.group, block: this.testInfo.block}
    return this.http.post(url, bodyParse, {headers})
      .pipe(take(1));
  }
}
