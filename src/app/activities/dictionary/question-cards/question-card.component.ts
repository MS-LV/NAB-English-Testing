import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DictionariesQuestion, DictionaryChecker} from "../../../interface/dictionaries-question";
import {HelperService} from "../../../services/helper.service";
import {EverydayDialogComponent} from "../../../components/everyday-dialog/everyday-dialog.component";
import {MatDialog} from "@angular/material/dialog";
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
              private dialog: MatDialog,
              private service: EverydayService) {
    this.dictionaryForm = new FormGroup({
      cards: this.fb.array([])
    });

  }

  @Input('cards')
  set questions(val: DictionariesQuestion[]) {
    val.length = 5;
    console.log(val)
    this.initQuestions(val)
    this._questions = val;
  }

  get questions() {
    return this._questions;
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
    const checkAnswer = this.helper.checkerDictionary(this.questions, this.dictionaryForm.value['cards']);
    this.openResultDialog(checkAnswer);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.accessToken}`
    });
    const saveTesting = this.service.saveToHistory(checkAnswer, headers)
      .subscribe((item) => {
        console.log(item)
      });
    this.isChecked = true;
    // this.dictionaryForm.reset();
    this.subscriptions.push(saveTesting)
  }

  openResultDialog(data: DictionaryChecker): void {
    this.dialog.open(EverydayDialogComponent, {
      data: data,
    });
  }

  getCardValue(index: number) {
    return (this.dictionaryForm.get('cards') as FormArray).controls[index].value.toLowerCase();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
