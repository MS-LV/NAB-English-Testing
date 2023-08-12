import {Injectable} from '@angular/core';
import {GrammarQS, WritingQS} from "../../interface/testing";

@Injectable({
  providedIn: 'root'
})
export class WritingService {

  constructor() {
  }

  formatArray(data: any[]): WritingQS[] {
    const slicedData = data.slice();
    return slicedData;
  }
}
