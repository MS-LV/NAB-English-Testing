import {AfterViewInit, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DictionaryChecker} from "../../interface/dictionaries-question";

@Component({
  selector: 'app-everyday-dialog',
  templateUrl: './everyday-dialog.component.html',
  styleUrls: ['./everyday-dialog.component.scss']
})
export class EverydayDialogComponent implements AfterViewInit {
  private _score:number;
  get score(): number {
    const {correct, incorrect} = this.data;
    const score = (correct.length / (correct.length + incorrect.length)) * 100;
    const result = score >= 85 ? 5 : score >= 65 ? 4 : score >= 50 ? 3 : score >= 30 ? 2 : 1;
    return result;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: DictionaryChecker) {
  }

  ngAfterViewInit() {

  }

  reloadPage() {
    window.location.reload();
  }
}
