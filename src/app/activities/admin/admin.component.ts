import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../services/config.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthorizationMessage} from "../../interface/login";
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {IServerConfig} from "../../interface/configs";
import {catchError, Observable, of, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as XLSX from 'xlsx';
import {AdminService} from "./admin.service";
import {IQuestionList} from "./admin.interface";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  serverConfig: IServerConfig;
  uploadForm: FormGroup;
  jsonContent: IQuestionList[] = [];

  constructor(private config: ConfigService,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder,
              private service: AdminService) {
  }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      dictionary: [''],
      listening: [''],
      grammar: [''],
      writing: ['']
    });
    const serverConfigs = this.config.serverConfig()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return this.errorHandler(err)
        })
      )
      .subscribe((configs) => {
        if (configs) {
          this.serverConfig = configs;
        }
      });
  }

  changeOptions() {
    this.config.updateServerConfig(this.serverConfig)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return this.errorHandler(err)
        })
      )
      .subscribe((configs) => {
        if (configs) {
          this.serverConfig = configs;
        }
      });
  }

  inputChange(input: HTMLInputElement) {
    if (!input.files?.length) {
      return
    }
    const file = input.files[0];
    if (!file.name.match(/(\.xlsx$|\.xls$|\.csv$)/gi)) {
      const data: AuthorizationMessage = {
        status: 'error',
        message: 'It isn`t Exel file. Extensions: (.xlsx, .xls, .csv)'
      }
      this.openSnackBar(data);
      input.value = '';
      return;
    }
    this.readFile(file, input.name);
  }

  onSubmit(inputs: HTMLInputElement[]) {
    if (!this.jsonContent.length) {
      const message: AuthorizationMessage = {message: 'You didn\'t choose any file !', status: 'error'};
      this.openSnackBar(message);
      return;
    }
    const saveQuestions = this.service.saveQuestion(this.jsonContent)
      .pipe(tap(response => {
        this.openSnackBar(response);
        this.jsonContent.length = 0;
      }), catchError((err: HttpErrorResponse) => this.errorHandler(err)))
      .subscribe();
    inputs.forEach((input) => {
      input.value = ''
    })
  }

  private openSnackBar(data: AuthorizationMessage) {
    const className = data.status === 'success' ? 'success' : 'error'
    this._snackBar.openFromComponent(SnackbarComponent, {
      panelClass: [className],
      duration: 5000,
      data
    });
  }

  private errorHandler(err: HttpErrorResponse): Observable<never> {
    if (err.statusText === 'Not Found') {
      const message = {
        statusCode: 404,
        status: 'error',
        message: 'Client Error 404 !'
      }
      this.openSnackBar(message);
      return of();
    }
    err.error.status = 'error';
    this.openSnackBar(err.error);
    return of();
  }

  private readFile(file: File, type: string) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const fileStr = e.target.result;
      const workbook = XLSX.read(fileStr, {type: "binary"});
      const convertJSON = this.convertToJSON(workbook);
      const card = {
        type,
        list: convertJSON
      }
      this.jsonContent.push(card);
    };
    if (file.name.match(/\.csv$/)) {
      return reader.readAsText(file);
    }
    reader.readAsBinaryString(file);
  }

  private convertToJSON(workBook: XLSX.WorkBook) {
    const firstSheetName = workBook.SheetNames[0];
    const worksheet = workBook.Sheets[firstSheetName];
    const convertArray = XLSX.utils.sheet_to_json(worksheet, {header: 1});
    const convertTitle = (convertArray.shift() as string[]);
    const convertJSON: any[] = [];
    convertArray.forEach((item) => {
      if (!Array.isArray(item) || !item.length) {
        return
      }
      let question: any = {}
      convertTitle.forEach((card, i) => {
        question[card] = item[i];
      });
      convertJSON.push(question);
    });
    return convertJSON
  }

}
