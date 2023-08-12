import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {ConfigService} from "../services/config.service";
import {IServerConfig} from "../interface/configs";

@Injectable({
  providedIn: 'root'
})
export class TestingPageGuard implements CanActivate {
  constructor(private config: ConfigService,
              private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.config.serverConfig().pipe(
      map((config) => {
        if (config.isExam) {
          return true;
        }
        this.router.navigate(['/profile']).then();
        return config.isExam;
      }));
  }

}
