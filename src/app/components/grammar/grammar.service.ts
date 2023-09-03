import {Injectable} from '@angular/core';
import {GrammarQS} from '../../interface/testing';
import {HelperService} from "../../services/helper.service";
import {GrammarQuestion} from "../../activities/testing/testing.interface";

@Injectable({
  providedIn: 'root'
})
export class GrammarService {

  constructor(private helper: HelperService) {
  }

  formatArray(data: GrammarQuestion[]): GrammarQuestion[] {
    const slicedData = this.helper.shuffleArray(data.slice());
    slicedData.forEach(item => {
      const {answer} = item;
      item.description = item.description.replace(/_+/gi, '_____')
      const options = [...item.option.split(';'), answer].sort((a, b) => Math.random() - 0.5).map(item => item.trim());
      item.options = options;
    });
    return slicedData;
  }
}
