import {AfterViewInit, Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DictionariesQuestion} from "../../../interface/dictionaries-question";
import {timer} from "rxjs";
import {HelperService} from "../../../services/helper.service";

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['../dictionary.component.scss', './question-card.component.scss']
})
export class QuestionCardComponent implements AfterViewInit {
  dictionaryForm: FormGroup;
  private _questions: DictionariesQuestion[] = [];
  @Input('cards')
  set questions(val:DictionariesQuestion[]) {
    this.initQuestions(val)
    this._questions = val;
  }
  get questions(){
    return this._questions;
  }

  constructor(public fb: FormBuilder,
              private helper: HelperService) {
    this.dictionaryForm = new FormGroup({
      cards: this.fb.array([])
    });

  }

  get cardArray(): FormArray {
    return this.dictionaryForm.controls['cards'] as FormArray;
  }

  initQuestions(questions: DictionariesQuestion[]) {
    for (let i = 0; i < questions.length; i++) {
      this.cardArray.push(new FormControl('', Validators.required));
    }
  }

  onSubmit(event: Event): void {
    this.dictionaryForm.reset();
  }

  ngAfterViewInit() {
  }
}
