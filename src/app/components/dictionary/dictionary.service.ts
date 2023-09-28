import {Injectable} from '@angular/core';
import {HelperService} from "../../services/helper.service";
import {DictionariesQuestion} from "../../interface/dictionaries-question";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private helper: HelperService) {
  }

  formatArray(data: DictionariesQuestion[]): DictionariesQuestion[] {
    const slicedData = this.helper.shuffleArray(data.slice());
    if (slicedData.length > 20) {
      slicedData.length = 20;
    }
    return slicedData;
  }
}
