import {ConfigsInterface, IServerConfig, IUserInfo} from "../interface/configs";
import {Observable, take, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {TestingService} from "../activities/testing/testing.service";

@Injectable()
export class ConfigService {
  upConfig!: ConfigsInterface;
  serverConfig: IServerConfig;

  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    // @ts-ignore
    this.upConfig = window.upConfig;
  }

  getServerConfig(): Observable<IServerConfig> {
    const url = this.upConfig.serverConfig;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.get<IServerConfig>(url, {headers})
      .pipe(
        take(1),
        tap((configs) => {
          this.serverConfig = configs;
        })
      );
  }

  updateServerConfig(): Observable<IServerConfig> {
    const url = this.upConfig.serverConfig;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.put<IServerConfig>(url, this.serverConfig, {headers})
      .pipe(
        take(1),
        tap((config) => {
          this.serverConfig = config;
        })
      );
  }

  get userInfo(): IUserInfo {
    return JSON.parse(localStorage.getItem('userInfo') as any);
  }

  get accessToken(): string {
    return JSON.parse(localStorage.getItem('accessToken') as any);
  }

  get deviceType() {
    const deviceDetector = {
      isMobile: function () {
        return /Mobi|Android/i.test(navigator.userAgent);
      },
      isTablet: function () {
        return /Tablet|iPad/i.test(navigator.userAgent);
      },
      isDesktop: function () {
        return !this.isMobile() && !this.isTablet();
      },
      getDeviceType: function () {
        if (this.isMobile()) {
          return "mobile";
        } else if (this.isTablet()) {
          return "tablet";
        } else {
          return "desktop";
        }
      }
    };
    return deviceDetector.getDeviceType();
  }
}
