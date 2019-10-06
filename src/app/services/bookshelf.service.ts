import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookShelfService {

  constructor(
    public db: AngularFirestore,
  ) { }

  getBookshelf(_uid: string): Observable<any[]> {
    return this.db.collection(`users/${_uid}/userBooks`,
      ref => ref.orderBy('updatedDate', 'desc')).valueChanges();
  }
}
