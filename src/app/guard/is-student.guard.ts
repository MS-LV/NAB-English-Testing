import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ConfigService} from "../services/config.service";

@Injectable({
  providedIn: 'root'
})
export class IsStudentGuard implements CanActivate {
  constructor(private config: ConfigService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.config?.userInfo?.role === 'STUDENT') {
      return true;
    }
    return false;
  }

}
