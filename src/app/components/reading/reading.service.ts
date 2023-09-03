import {Injectable} from '@angular/core';
import {GrammarQS} from "../../interface/testing";

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  constructor() {
  }

  formatArray(data: any[]): GrammarQS[] {
    const slicedData = data.slice();
    slicedData.forEach(item => {
      const {answer} = item;
      item.description = item.description.replace(/_+/gi, '_____');
      const options = [...item.option.split(';'), answer].sort((a, b) => Math.random() - 0.5).map(item => item.trim());
      item.options = options;
    });
    return slicedData;
  }

}
