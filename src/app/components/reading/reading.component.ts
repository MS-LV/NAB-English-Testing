import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GrammarQS, ReadingQS} from "../../interface/testing";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../services/helper.service";
import {ConfigService} from "../../services/config.service";
import {TestingService} from "../../activities/testing/testing.service";
import {ReadingService} from "./reading.service";
import {ReadingQuestion} from "../../activities/testing/testing.interface";

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss', '../../components/styles/questions.scss']
})
export class ReadingComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  date = new Date();
  currentCard: ReadingQS[] = [];
  questionForm: FormGroup = new FormGroup({
    questions: new FormArray([])
  });

  constructor(private service: ReadingService,
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
    const checkAnswer = this.helper.checkerGrammar(this.currentCard, answer, 'reading');
    this.testingService.saveData.push(checkAnswer);
    this.onSubmit.emit('submit');
  }

  private loadQuestions() {
    const questions = this.service.formatArray(this.testingService.currentCard);
    questions.length = 5;
    this.currentCard = questions;
    console.log(questions);
    for (let i = 0; i < questions.length; i++) {
      this.questionArray.push(new FormControl('', Validators.required));
    }
  }
}
