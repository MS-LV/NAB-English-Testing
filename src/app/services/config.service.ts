import {ConfigsInterface, UserInfo} from "../interface/configs";

export class ConfigService {
  upConfig!: ConfigsInterface;
  private _private: UserInfo;

  constructor() {
    this.init();
  }

  init() {
    // @ts-ignore
    this.upConfig = window.upConfig;
  }

  get userInfo(): UserInfo {
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
