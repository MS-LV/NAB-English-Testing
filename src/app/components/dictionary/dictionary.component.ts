import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DictionaryQS} from "../../interface/testing";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../services/helper.service";
import {ConfigService} from "../../services/config.service";
import {TestingService} from "../../activities/testing/testing.service";
import {DictionaryService} from "./dictionary.service";
import {DictionariesQuestion} from "../../interface/dictionaries-question";
import {timer} from "rxjs";

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss', '../../components/styles/questions.scss']
})
export class DictionaryComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  questionForm: FormGroup = new FormGroup({
    questions: new FormArray([])
  });

  private _questions: DictionariesQuestion[] | any[];

  constructor(private service: DictionaryService,
              private helper: HelperService,
              public config: ConfigService,
              public testingService: TestingService) {
  }

  @Input()
  set questions(val: DictionariesQuestion[] | any) {
    val.length = 5;
    this._questions = val;
    this.loadQuestions();
  };

  get questions(): DictionariesQuestion[] | any {
    return this._questions;
  }

  get questionArray(): FormArray {
    return this.questionForm.controls['questions'] as FormArray;
  }

  questionSubmit(event: Event) {
    const answer = this.questionForm.value.questions;
    const checkAnswer = this.helper.checkerDictionary(this.questions, answer, 'grammar');
    this.testingService.saveData.push(checkAnswer);
    this.onSubmit.emit('submit');
  }

  private loadQuestions() {
    const questions = this.service.formatArray(this.questions);
    for (let i = 0; i < questions.length; i++) {
      this.questionArray.push(new FormControl('', Validators.required));
    }
  }
}
