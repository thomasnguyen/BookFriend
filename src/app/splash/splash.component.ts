import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  constructor(
    private authSvc: AuthService,
    private router: Router,
  ) { }

  ngOnInit() { }
  
  //////////
  // click handlers
  /////////

  onGoogleSSO(): void{
    // inits google auth
    this.authSvc.googleSignIn();
  }

  onEmailLogin(): void {
    // routes to auth-email
    this.router.navigate(['/auth'], {
      queryParams: {
        step: 'login',
      }
    });
  }

}
