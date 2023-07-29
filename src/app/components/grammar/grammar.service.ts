import {Injectable} from '@angular/core';
import {GrammarQS} from '../../interface/testing';
import {DictionaryChecker} from "../../interface/dictionaries-question";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {ConfigService} from "../../services/config.service";
import {GrammarChecker} from "./grammar.interface";

@Injectable({
  providedIn: 'root'
})
export class GrammarService {

  constructor(private config: ConfigService,
              private http: HttpClient) {
  }

  formatArray(data: any[]): GrammarQS[] {
    const slicedData = data.slice();
    slicedData.forEach(item => {
      const {answer} = item;
      item.description = item.description.replace(/_+/gi, '_____')
      const options = [...item.option.split(','), answer].sort((a, b) => Math.random() - 0.5);
      item.options = options;
    });
    return slicedData;
  }

  // saveToHistory(body: GrammarChecker, headers: HttpHeaders, testInfo:{ group: string; block: string }): Observable<any> {
  //   body = {...body, group: testInfo.group, block: testInfo.block};
  //   return this.http.post(this.config.upConfig.history, body, {headers})
  //     .pipe(take(1));
  // }
}
