import {Component} from '@angular/core';
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(public config: ConfigService) {
  }
}
