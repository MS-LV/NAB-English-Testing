import {Injectable} from '@angular/core';
import {ListeningQS} from "../../interface/testing";

@Injectable({
  providedIn: 'root'
})
export class ListeningService {

  constructor() { }

  formatArray(data: any[]): ListeningQS[] {
    const slicedData = data.slice();
    slicedData.forEach(item => {
      const {answer} = item;
      item.description = item.description.replace(/\.+/gi, '_____')
      const options = [...item.option.split(';'), answer].sort((a, b) => Math.random() - 0.5);
      item.options = options;
    });
    return slicedData;
  }
}
