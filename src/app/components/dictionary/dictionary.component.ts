import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../services/helper.service";
import {ConfigService} from "../../services/config.service";
import {TestingService} from "../../activities/testing/testing.service";
import {DictionaryService} from "./dictionary.service";
import {DictionariesQuestion} from "../../interface/dictionaries-question";

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss', '../../components/styles/questions.scss']
})
export class DictionaryComponent implements OnInit{
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() questions: DictionariesQuestion[] | any[]
  questionForm: FormGroup = new FormGroup({
    questions: new FormArray([])
  });

  constructor(public config: ConfigService,
              public testingService: TestingService,
              private service: DictionaryService,
              private helper: HelperService) {
  }
  ngOnInit() {
    this.loadQuestions()
  }

  get questionArray(): FormArray {
    return this.questionForm.controls['questions'] as FormArray;
  }

  questionSubmit(event: Event) {
    const answer = this.questionForm.value.questions;
    const checkAnswer = this.helper.checkerDictionary(this.questions, answer, 'dictionary');
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
