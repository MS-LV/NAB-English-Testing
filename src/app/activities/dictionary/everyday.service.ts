import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ConfigService} from "../../services/config.service";
import {map, Observable, take, tap} from "rxjs";
import {DictionariesQuestion, DictionaryChecker} from "../../interface/dictionaries-question";
import {HelperService} from "../../services/helper.service";
import {Router} from "@angular/router";
import {HistoryResponse} from "../../interface/history";

@Injectable({providedIn: 'root'})
export class EverydayService {
    private testInfo: { group: string; block: string };
    checkedQuestions: DictionaryChecker

    constructor(
        private config: ConfigService,
        private http: HttpClient,
        private helper: HelperService,
        private router: Router) {
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

    saveHistory(body: DictionaryChecker | null, headers: HttpHeaders, isExpired = false): Observable<HistoryResponse> {
        const url = this.config.upConfig.everyday;
        const data = [];
        if (body) {
            const {correct, incorrect, type} = body;
            data.push({correct, incorrect, type});
        }
        const bodyParse = {data, group: this.testInfo.group, block: this.testInfo.block, isExpired}
        return this.http.post<HistoryResponse>(url, bodyParse, {headers})
            .pipe(take(1), tap((history) => {
                this.router.navigate(['/history', history._id]).then();
            }));
    }
}
