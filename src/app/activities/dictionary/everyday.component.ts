import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EverydayService} from "./everyday.service";
import {QuestionCardComponent} from "./question-cards/question-card.component";
import {DictionariesQuestion} from "../../interface/dictionaries-question";
import {MatDialog} from "@angular/material/dialog";
import {EverydayDialogComponent} from "../../components/everyday-dialog/everyday-dialog.component";
import {HelperService} from "../../services/helper.service";
import {Subscription} from "rxjs";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-everyday',
  templateUrl: './everyday.component.html',
  styleUrls: ['./everyday.component.scss']
})
export class EverydayComponent implements OnInit, OnDestroy {
  @ViewChild('questions', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;
  studentInfo: FormGroup;
  blocks: string[] = ['A', 'B', 'C'];
  isAuthorized = false;
  dictionariesCards: DictionariesQuestion[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    public service: EverydayService,
    public config: ConfigService,
    private resolver: ComponentFactoryResolver,
    private helper: HelperService
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
    const formValue = this.studentInfo.value
    const question = this.service.getDictationQuestion(formValue.block, formValue.group)
      .subscribe((cards) => {
        this.isAuthorized = true;
        this.addQuestions(cards);
      });
    this.subscriptions.push(question);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

}
