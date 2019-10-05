import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() { }
  
  onForgotPassword() {
    // this.router.navigate([
  }
}
