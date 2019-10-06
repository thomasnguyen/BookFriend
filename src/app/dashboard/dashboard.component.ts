import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { User } from '../models/user.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  constructor(
    private title: Title,
    private storage: StorageMap,
  ) { }

  ngOnInit() {
    this.title.setTitle('BookFriends - Dashboard');
    this.storage.get('currentUser').subscribe((user: User) => {
      // console.log(user);
      this.currentUser = user;
    });
  }

}
