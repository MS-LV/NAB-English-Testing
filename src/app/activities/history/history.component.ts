import {Component, OnInit} from '@angular/core';
import {HistoryService} from "./history.service";
import {HistoryResponse} from "../../interface/history";
import {ConfigService} from "../../services/config.service";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
    historyData: HistoryResponse[] = [];

    constructor(private service: HistoryService,
                public config: ConfigService) {
    }

    ngOnInit() {
        this.service.getHistory().subscribe((item) => {
            console.log(item)
            this.historyData = item;
        })
    }
}
