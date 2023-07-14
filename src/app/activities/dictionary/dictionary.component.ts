import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DictionaryService} from "./dictionary.service";
import {QuestionCardComponent} from "./question-cards/question-card.component";
import {DictionariesQuestion} from "../../interface/dictionaries-question";

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {
  @ViewChild('questions', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;
  studentInfo: FormGroup;
  blocks: string[] = ['A', 'B', 'C'];
  isAuthorized = false;
  dictionariesCards: DictionariesQuestion[] = [];

  constructor(
    public service: DictionaryService,
    private resolver: ComponentFactoryResolver
  ) {
    this.studentInfo = new FormGroup({
      group: new FormControl('', [Validators.required]),
      block: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {

  }

  addQuestions(cards: DictionariesQuestion[]): void {
    const factory = this.resolver.resolveComponentFactory(QuestionCardComponent);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.questions = cards;
  }

  studentInfoSubmit(event: Event): void {
    const form = <HTMLFormElement>event.currentTarget;
    const question = this.service.getDictationQuestion(this.studentInfo.value.block)
      .subscribe((cards) => {
        this.isAuthorized = true;
        this.addQuestions(cards);
      });
  }
}
