import {Component} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  durationInSeconds = 1000;
  constructor(private _snackBar: MatSnackBar) {
  }
}
