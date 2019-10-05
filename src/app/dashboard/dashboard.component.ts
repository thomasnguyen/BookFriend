import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  constructor(
    private storage: StorageMap,
  ) { }

  ngOnInit() {
    this.storage.get('currentUser').subscribe((user: User) => {
      // console.log(user);
      this.currentUser = user;
    });
  }

}
