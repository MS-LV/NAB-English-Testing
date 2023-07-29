import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GrammarQS} from "../../interface/testing";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {GrammarService} from "../grammar/grammar.service";
import {HelperService} from "../../services/helper.service";
import {ConfigService} from "../../services/config.service";
import {TestingService} from "../../activities/testing/testing.service";
import {ListeningService} from "./listening.service";
import {ListeningQuestions} from "../../activities/testing/testing.interface";

@Component({
  selector: 'app-listening',
  templateUrl: './listening.component.html',
  styleUrls: ['./listening.component.scss', '../../components/styles/questions.scss']
})
export class ListeningComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  date = new Date();
  currentCard: GrammarQS[] = [];
  questionForm: FormGroup = new FormGroup({
    questions: new FormArray([])
  });

  constructor(private service: ListeningService,
              private helper: HelperService,
              public config: ConfigService,
              public testingService: TestingService) {
    this.loadQuestions();
  }

  get questionArray(): FormArray {
    return this.questionForm.controls['questions'] as FormArray;
  }

  questionSubmit() {
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
