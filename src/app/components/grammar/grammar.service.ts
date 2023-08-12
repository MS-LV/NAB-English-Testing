import {Injectable} from '@angular/core';
import {GrammarQS} from '../../interface/testing';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../services/config.service";

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
      const options = [...item.option.split(';'), answer].sort((a, b) => Math.random() - 0.5);
      item.options = options;
    });
    return slicedData;
  }
}
