import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WritingQuestion} from "../../activities/testing/testing.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../services/config.service";
import {TestingService} from "../../activities/testing/testing.service";

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss', '../../components/styles/questions.scss']
})
export class WritingComponent implements OnInit {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() questions: WritingQuestion[] | any[];
  date = new Date();
  questionForm: FormGroup = new FormGroup({
    theme: new FormControl('', [Validators.required]),
    essay: new FormControl('')
  });

  constructor(public config: ConfigService,
              public testingService: TestingService) {
  }

  ngOnInit() {
  }


  questionSubmit() {
    const answer = {...this.questionForm.value, type: 'writing'};
    this.testingService.saveData.push(answer);
    this.onSubmit.emit('submit');
  }
}
