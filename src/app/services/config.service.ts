import {ConfigsInterface} from "../interface/configs";

export class ConfigService {
  upConfig?: ConfigsInterface;

  constructor() {
    this.init();
  }

  init() {
    // @ts-ignore
    this.upConfig = window.upConfig;
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
