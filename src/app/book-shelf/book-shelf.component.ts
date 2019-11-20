import { Component, OnInit } from "@angular/core";
import { StorageMap } from "@ngx-pwa/local-storage";
import { BookShelfService } from "../services/bookshelf.service";
import { User } from "../models/user.model";

@Component({
  selector: "app-book-shelf",
  templateUrl: "./book-shelf.component.html",
  styleUrls: ["./book-shelf.component.scss"]
})
export class BookShelfComponent implements OnInit {
  currentUser: User;
  bookshelf = [];
  constructor(
    private storage: StorageMap,
    private bookShelfSvc: BookShelfService
  ) {}

  ngOnInit() {
    this.storage.get("currentUser").subscribe((user: User) => {
      // console.log(user);
      this.currentUser = user;
      this.bookShelfSvc.getBookshelf(this.currentUser.uid).subscribe(res => {
        this.bookshelf = this.bookshelf;
      });
    });
  }
}
