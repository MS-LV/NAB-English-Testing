import {Injectable} from '@angular/core';
import {ListeningQS} from "../../interface/testing";
import {HelperService} from "../../services/helper.service";

@Injectable({
  providedIn: 'root'
})
export class ListeningService {

  constructor(private helper: HelperService) {
  }

  formatArray(data: any[]): ListeningQS[] {
    const slicedData = this.helper.shuffleArray(data.slice());
    slicedData.forEach(item => {
      const {answer} = item;
      item.description = item.description.replace(/\.+/gi, '_____')
      const options = [...item.option.split(';'), answer].sort((a, b) => Math.random() - 0.5).map(item => item.trim());
      item.options = options;
    });
    return slicedData;
  }
}
