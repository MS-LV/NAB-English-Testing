import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../services/config.service";
import {TestingService} from "./testing.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss', '../../components/styles/questions.scss']
})
export class TestingComponent {
  testingInfo: FormGroup;
  page = '';
  blocks: string[] = ['A', 'B', 'C'];
  date = new Date();
  testSteps = ['grammar', 'reading', 'listening', 'dictionary', 'writing'];
  // testSteps = ['writing', 'grammar'];

  private idxCard = 0;

  constructor(public config: ConfigService,
              public service: TestingService) {
    this.testingInfo = new FormGroup({
      group: new FormControl('web', [Validators.required]),
      block: new FormControl('A', [Validators.required])
    });
    // this.startTestingSubmit();
  }

  startTestingSubmit() {
    const {block, group} = this.testingInfo.value;
    this.service.loadCard(this.testSteps[this.idxCard], block, group)
      .subscribe((item) => {
        this.changePage();
      });
  }

  changePage() {
    this.page = this.testSteps[this.idxCard];
    this.idxCard++;
  }

  onSubmitCards(evt: any) {
    this.startTestingSubmit();
    console.log(this.service.saveData);
  }
}
