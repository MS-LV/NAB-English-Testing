import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DictionariesQuestion} from "../../../interface/dictionaries-question";
import {HelperService} from "../../../services/helper.service";
import {EverydayService} from "../everyday.service";
import {HttpHeaders} from '@angular/common/http';
import {ConfigService} from "../../../services/config.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['../everyday.component.scss', './question-card.component.scss']
})
export class QuestionCardComponent implements AfterViewInit, OnDestroy {
  dictionaryForm: FormGroup;
  isChecked = false;

  private _questions: DictionariesQuestion[] = [];
  private subscriptions: Subscription[] = [];

  constructor(public fb: FormBuilder,
              public config: ConfigService,
              private helper: HelperService,
              private service: EverydayService) {
    this.dictionaryForm = new FormGroup({
      cards: this.fb.array([])
    });

  }

  @Input('cards')
  set questions(val: DictionariesQuestion[]) {
    this.initQuestions(val)
    this._questions = val;
  }

  get questions() {
    return this._questions;
  }

  @Input()
  set isExpired(value: boolean) {
    console.log(324234234234)
    this.saveHistory(value);
  }

  get cardArray(): FormArray {
    return this.dictionaryForm.controls['cards'] as FormArray;
  }

  initQuestions(questions: DictionariesQuestion[]) {
    for (let i = 0; i < questions.length; i++) {
      this.cardArray.push(new FormControl('', Validators.required));
    }
  }

  onSubmit(): void {
    this.saveHistory();
  }

  saveHistory(isExpired = false) {
    const checkAnswer = this.helper.checkerDictionary(this.questions, this.dictionaryForm.value['cards'], 'dictionary');
    this.service.checkedQuestions = checkAnswer;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`
    });
    const saveTesting = this.service.saveHistory(checkAnswer, headers, isExpired).subscribe();
    this.isChecked = true;
    this.subscriptions.push(saveTesting);
  }

  // getCardValue(index: number) {
  //   return (this.dictionaryForm.get('cards') as FormArray).controls[index].value.toLowerCase();
  // }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

}
