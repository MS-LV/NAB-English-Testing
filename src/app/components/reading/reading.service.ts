import {Injectable} from '@angular/core';
import {GrammarQS} from "../../interface/testing";
import {ReadingQuestion} from "../../activities/testing/testing.interface";

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  constructor() {
  }

  formatArray(questions: ReadingQuestion[]): ReadingQuestion[] {
    const slicedData = questions.slice();
    slicedData.forEach(item => {
      const {answer} = item;
      item.description = item.description.replace(/_+/gi, '_____');
      const options = [...item.option.split(';'), answer]
        .sort((a, b) => Math.random() - 0.5)
        .map(item => item.trim());
      item.options = options;
    });
    return slicedData;
  }

  extractText(questions: ReadingQuestion[]): HTMLDivElement {
    const htmlDiv = document.createElement('div');
    let sectionDiv = document.createElement('div');
    questions.forEach((question, i) => {
      if (sectionDiv.children.length > 0 && (question.text === '<br>' || i >= questions.length - 1)) {
        htmlDiv.append(sectionDiv);
        sectionDiv = document.createElement('div');
        return;
      }
      if (sectionDiv.childNodes.length <= 0) {
        const firstChild = document.createElement('div');
        firstChild.classList.add('first-child');
        firstChild.append(question.text);
        sectionDiv.append(firstChild);
        return;
      }
      sectionDiv.append(question.text);
    })
    return htmlDiv;
  }
}
