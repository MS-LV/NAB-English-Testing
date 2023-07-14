import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ConfigService} from "../../services/config.service";
import {filter, map, Observable} from "rxjs";
import {DictionariesQuestion} from "../../interface/dictionaries-question";

@Injectable({providedIn: 'root'})
export class DictionaryService {

  constructor(
    private config: ConfigService,
    private http: HttpClient) {
  }

  getDictationQuestion(block: string): Observable<DictionariesQuestion[]> {
    return this.http.get<DictionariesQuestion[]>(this.config.upConfig!.dictionary).pipe(
      map((item) => {
        return item.filter(item => {
          return item.block === block;
        });
      })
    );
  }
}
