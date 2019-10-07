import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';
import { first } from 'rxjs/operators';
import { BookShelfService } from './services/bookshelf.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private authSvc: AuthService,
    private bookShelfSvc: BookShelfService,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  isLoggedIn() {
    return this.authSvc.user$.pipe(first());
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // get auth state
      this.authSvc.user$.subscribe((user) => {
        // if state dne then redirect to splash
        // if they are in these special sites then thats okay
        if (!user) {
          const noAuthRoutes = ['welcome', 'auth'];
          const currRoute = this.router.routerState.snapshot.root.firstChild.routeConfig.path;
          // console.log(this.router.routerState.snapshot.root.firstChild.routeConfig.path);
          if (!noAuthRoutes.includes(currRoute)) {
            this.router.navigate(['/welcome']);
          };

        } else {
          // get books
          // this.bookSvc.get
          this.getBookShelf(user.uid);
          this.router.navigate(['/dashboard']);
        }

        // else redirect to dashboard
        this.redirectOnAuthState();
      });
    });
  }

  getBookShelf(userID: string): void {
    this.bookShelfSvc.getBookshelf(userID).subscribe((bookShelf: any[]) => {
      // set to indexedDB
    });
  }

  async redirectOnAuthState() {
    const user = await this.isLoggedIn()
    if (user) {
      // do something
    } else {
      this.router.navigate(['/welcome']);
    }
  }
}
