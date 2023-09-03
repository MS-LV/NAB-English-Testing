import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {map, Observable} from 'rxjs';
import {HelperService} from "../services/helper.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private helper: HelperService, private router: Router) {
  }

  canActivate(): Observable<boolean> | boolean {
    const accessToken = localStorage.getItem('accessToken');
    return this.helper.checkUser().pipe(map((isAuth) => {
      if (isAuth) {
        return true;
      }
      this.router.navigate(['/login']).then();
      return isAuth && (new Date()).getTime() < 1696102389000;
    }));
  }

}
