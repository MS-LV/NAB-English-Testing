import {Injectable} from '@angular/core';
import {DictionaryQS} from "../../interface/testing";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor() {
  }

  formatArray(data: any[]): DictionaryQS[] {
    const slicedData = data.slice();
    return slicedData;
  }
}
