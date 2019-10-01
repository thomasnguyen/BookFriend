import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	user$: Observable<User>;


	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private router: Router,
  ) {
	this.user$ = this.afAuth.authState.pipe(
		switchMap(user => {
        if (user) {
          return this.afs.doc<User>('users/$user.uid').valueChanges();
        } else {
          return of(null);
        }
		  })
	  );
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      avatar: user.avatar,
    };

    return userRef.set(data, { merge: true });
  }
}
