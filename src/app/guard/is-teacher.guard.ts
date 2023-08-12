import {Injectable} from '@angular/core';
import {CanActivate, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ConfigService} from "../services/config.service";

@Injectable({
  providedIn: 'root'
})
export class IsTeacherGuard implements CanActivate {
  constructor(private config: ConfigService) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.config?.userInfo?.role === 'TEACHER') {
      return true;
    }
    return false;
  }

}
