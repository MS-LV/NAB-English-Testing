import {Component, EventEmitter, Input, Output} from '@angular/core';
import {WritingQuestion} from "../../activities/testing/testing.interface";

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss']
})
export class WritingComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() questions: WritingQuestion[] | any[] = [];
}
