import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-speaking',
  templateUrl: './speaking.component.html',
  styleUrls: ['./speaking.component.scss']
})
export class SpeakingComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() questions: any[] = []
}
