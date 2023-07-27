import {Component} from '@angular/core';
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {AuthorizationMessage} from "../../interface/login";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  durationInSeconds = 5;
  registrationForm: FormGroup;
  logInForm: FormGroup;
  passwordLength = 4
  isTeacher = false;

  constructor(
    private _snackBar: MatSnackBar,
    private service: LoginService,
    private route: Router
  ) {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surename: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.passwordLength)]),
      accessKey: new FormControl('')
    });

    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit(isLogin: boolean) {
    if (isLogin) {
      this.service.login(this.logInForm.value)
        .subscribe((next) => {
          this.openSnackBar(next);
          if (next.statusCode !== 200 ) {
            return;
          }
          this.route.navigate(['/profile'])
        })
    } else {
      this.service.registration(this.registrationForm.value)
        .subscribe((next) => {
          this.openSnackBar(next);
          if (next.statusCode !== 200 ) {
            return;
          }
          this.route.navigate(['/profile'])
        })
    }
  }

  clear() {
    this.registrationForm.reset()
    this.logInForm.reset()
  }

  openSnackBar(data: AuthorizationMessage) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data
    });
  }
}
