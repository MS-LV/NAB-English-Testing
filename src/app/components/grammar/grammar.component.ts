import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../services/config.service";
import {TestingService} from "../../activities/testing/testing.service";
import {GrammarService} from "./grammar.service";
import {HelperService} from "../../services/helper.service";
import {GrammarQuestion} from "../../activities/testing/testing.interface";

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.scss', '../../components/styles/questions.scss']
})
export class GrammarComponent implements OnInit {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() questions: GrammarQuestion[] | any[];
  date = new Date();
  questionForm: FormGroup = new FormGroup({
    questions: new FormArray([])
  });

  constructor(private service: GrammarService,
              private helper: HelperService,
              private elementRef: ElementRef,
              public config: ConfigService,
              public testingService: TestingService) {
  }

  ngOnInit() {
    this.loadQuestions();
  }

  get questionArray(): FormArray {
    return this.questionForm.controls['questions'] as FormArray;
  }

  questionSubmit(event: Event) {
    const answer = this.questionForm.value.questions;
    const checkAnswer = this.helper.checkerGrammar(this.questions, answer, 'grammar');
    this.testingService.saveData.push(checkAnswer);
    this.onSubmit.emit('submit');
  }

  private loadQuestions() {
    this.questions = this.service.formatArray(this.questions);
    for (let i = 0; i < this.questions.length; i++) {
      this.questionArray.push(new FormControl('', Validators.required));
    }
  }

  scrollComponentIntoView() {
    try {
      this.elementRef.nativeElement.scrollIntoView({block: "start"});
      this.elementRef.nativeElement.scrollTop = 0;
    } catch (err) {
      // Возможно, браузер не поддерживает плавную прокрутку.
      // В таком случае можно выполнять обычную прокрутку без параметра behavior:
      // this.elementRef.nativeElement.scrollIntoView();
    }
  }
}
