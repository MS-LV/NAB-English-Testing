import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../services/config.service";
import {TestingService} from "../../activities/testing/testing.service";
import {GrammarService} from "./grammar.service";
import {GrammarQS} from 'src/app/interface/testing';
import {HelperService} from "../../services/helper.service";
import {GrammarQuestion} from "../../activities/testing/testing.interface";

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.scss', '../../components/styles/questions.scss']
})
export class GrammarComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  date = new Date();
  currentCard: GrammarQS[] = [];
  questionForm: FormGroup = new FormGroup({
    questions: new FormArray([])
  });

  constructor(private service: GrammarService,
              private helper: HelperService,
              public config: ConfigService,
              public testingService: TestingService) {
    this.loadQuestions();
  }

  get questionArray(): FormArray {
    return this.questionForm.controls['questions'] as FormArray;
  }

  questionSubmit(event: Event) {
    const answer = this.questionForm.value.questions;
    const checkAnswer = this.helper.checkerGrammar(this.currentCard, answer, 'grammar');
    this.testingService.saveData.push(checkAnswer);
    this.onSubmit.emit('submit');
  }

  private loadQuestions() {
    const questions = this.service.formatArray(this.testingService.currentCard);
    questions.length = 5;
    this.currentCard = questions;
    for (let i = 0; i < questions.length; i++) {
      this.questionArray.push(new FormControl('', Validators.required));
    }
  }
}