import {Component, OnInit} from '@angular/core';
import {HistoryService} from "./history.service";
import {HistoryResponse} from "../../interface/history";
import {ConfigService} from "../../services/config.service";
import {ActivatedRoute} from "@angular/router";
import {mergeMap} from "rxjs";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  historyData: HistoryResponse[] = [];

  constructor(public config: ConfigService,
              private service: HistoryService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(mergeMap((params) => {
        const user = params['user'] ? params['user'] : '';
        return this.service.getHistory(params['user']);
      })).subscribe((item) => {
      this.historyData = item;
    })
  }
}
