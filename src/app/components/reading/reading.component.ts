import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChildren} from '@angular/core';
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
export class ReadingComponent implements OnInit {
    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
    @Input() questions: ReadingQuestion[] | any[];
    questionForm: FormGroup = new FormGroup({
        questions: new FormArray([])
    });
    readingText: string;

    constructor(public config: ConfigService,
                public testingService: TestingService,
                private service: ReadingService,
                private helper: HelperService,
                private renderer: Renderer2) {
    }

    ngOnInit() {
        this.loadQuestions();
    }

    get questionArray(): FormArray {
        return this.questionForm.controls['questions'] as FormArray;
    }

    questionSubmit(event: Event) {
        const answer = this.questionForm.value.questions;
        const checkAnswer = this.helper.checkerGrammar(this.questions, answer, 'reading');
        this.testingService.saveData.push(checkAnswer);
        this.onSubmit.emit('submit');
    }

    private loadQuestions() {
        const questions = this.service.formatArray(this.questions);
        this.readingText = this.service.extractText(this.questions).innerHTML;
        for (let i = 0; i < questions.length; i++) {
            this.questionArray.push(new FormControl('', Validators.required));
        }
    }
}
