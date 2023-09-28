import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
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
export class ListeningComponent implements OnInit {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() questions: ListeningQuestions[] | any[];
  date = new Date();
  questionForm: FormGroup = new FormGroup({
    questions: new FormArray([])
  });

  constructor(private service: ListeningService,
              private helper: HelperService,
              public config: ConfigService,
              public testingService: TestingService) {
  }

  ngOnInit() {
    this.loadQuestions();
  }

  get questionArray(): FormArray {
    return this.questionForm.controls['questions'] as FormArray;
  }

  questionSubmit() {
    const answer = this.questionForm.value.questions;
    const checkAnswer = this.helper.checkerGrammar(this.questions, answer, 'listening');
    this.testingService.saveData.push(checkAnswer);
    this.onSubmit.emit('submit');
  }

  private loadQuestions() {
    this.questions = this.service.formatArray(this.questions);
    for (let i = 0; i < this.questions.length; i++) {
      this.questionArray.push(new FormControl('', Validators.required));
    }
  }
}
