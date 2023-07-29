import {Injectable} from '@angular/core';
import {map, Observable, take, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GrammarQuestion, ListeningQuestions, ReadingQuestion, WritingQuestion} from "./testing.interface";
import {DictionariesQuestion, DictionaryChecker} from "../../interface/dictionaries-question";
import {ConfigService} from "../../services/config.service";
import {GrammarChecker} from "../../components/grammar/grammar.interface";
import {ReadingChecker} from "../../components/reading/reading.interface";
import {ListeningChecker} from "../../components/listening/listening.interface";
import {WritingChecker} from "../../components/writing/writing.interface";
import {HelperService} from "../../services/helper.service";

@Injectable({
  providedIn: 'root'
})
export class TestingService {
  testInfo: { block: string; group: string };
  currentCard: GrammarQuestion[] | DictionariesQuestion[] | ListeningQuestions[] | WritingQuestion[] | ReadingQuestion[];
  saveData:any[] = [];
  // saveData:any[] = [];


  constructor(private http: HttpClient,
              private config: ConfigService,
              private helper: HelperService) {
  }


  loadCard(url: string, block: string, group: string): Observable<GrammarQuestion[]
    | DictionariesQuestion[]
    | ListeningQuestions[]
    | WritingQuestion[]
    | ReadingQuestion[]> {
    this.testInfo = {block, group};
    const requestURL = `${this.config.upConfig.testing}/${url}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`,
      'block': block,
      'level': this.config.userInfo.userLevel
    });
    return this.http.get<GrammarQuestion[]
      | DictionariesQuestion[]
      | ListeningQuestions[]
      | WritingQuestion[]
      | ReadingQuestion[]>(requestURL, {headers})
      .pipe(
        take(1),
        tap((item) => {
          const shuffleArray = this.helper.shuffleArray(item as any[]);
          console.log(shuffleArray);
          this.currentCard = shuffleArray
        })
      )
  }
}
