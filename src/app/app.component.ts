import {AfterViewInit, Component, ElementRef, OnDestroy} from '@angular/core';
import {ConfigService} from "./services/config.service";
import {HelperService} from "./services/helper.service";
import {Subscribable, Subscription, timer} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  elementNative: HTMLElement;
  title = 'NAB-English-Testing';
  device = '';
  isAuthorized = false;
  private observable: Subscription[] = [];

  isMenuOpen: boolean = false;

  constructor(
    public config: ConfigService,
    private element: ElementRef,
    private helper: HelperService
  ) {
    this.elementNative = this.element.nativeElement;
    this.init()
  }

  init() {
    this.device = this.config.deviceType;
    this.elementNative.classList.add(this.device);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngAfterViewInit() {
    const checkUser = this.helper.checkUser().subscribe();
    const isAuthorized = this.helper.isAuthenticated.subscribe((next) => {
      if (this.isAuthorized !== next) {
        this.isAuthorized = next;
      }
    });
    this.observable.push(isAuthorized, checkUser);
    this.helper.setAuthStatus(false);
  }

  ngOnDestroy() {
    this.observable.forEach((item) => item.unsubscribe());
  }
}
