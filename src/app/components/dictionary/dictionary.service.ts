import { Injectable } from '@angular/core';
import {DictionaryQS, GrammarQS} from "../../interface/testing";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor() { }
  formatArray(data: any[]): DictionaryQS[] {
    const slicedData = data.slice();
    // slicedData.forEach(item => {
    //   const {answer} = item;
    //   item.description = item.description.replace(/_+/gi, '_____')
    //   const options = [...item.option.split(','), answer].sort((a, b) => Math.random() - 0.5);
    //   item.options = options;
    // });
    return slicedData;
  }
}
