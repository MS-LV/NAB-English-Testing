import {Component} from '@angular/core';
import {ConfigService} from "../../services/config.service";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(public config: ConfigService,
              private helper: HelperService) {
  }

  logout() {
    const canLogout = confirm('You want logout from your account ?');
    if (canLogout) {
      this.helper.userLogout();
    }
  }

  remove() {
    const canRemove = confirm('Current user will be remove. Will continue ?');
    if (canRemove) {
      const userID = this.config.userInfo.id;
      const deleteUser = this.helper.removeUser(userID).subscribe();
    }
  }
}
