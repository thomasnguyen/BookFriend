import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { StorageMap } from '@ngx-pwa/local-storage';

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
    private storage: StorageMap,
  ) {
	this.user$ = this.afAuth.authState.pipe(
    switchMap(user => {
      //console.log(this.afs.doc<User>('users/$user.uid').valueChanges());

        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
		  })
	  );
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    
    
    return this.updateUserData(credential.user, credential.additionalUserInfo.isNewUser);
  }


  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user, firstTimeUser: boolean) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      avatar: user.photoURL,
    };

    // route to dashboard;
    if (firstTimeUser) {
      // route to onboarding
    } else {
      this.router.navigate(['dashboard']);
    }

    this.storage.set('currentUser', data).subscribe(() => {});
    return userRef.set(data, { merge: true });
  }
}
