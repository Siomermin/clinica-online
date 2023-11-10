import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from './firestore.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'; // Corrected import for operators

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afs: FirestoreService) { }

  async registerUser(email: string, password: string, userData: any, path: string) {
    try {
      const userCredential: any = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Include the UID in the data to be uploaded to Firestore
      userData.uid = user.uid;

      await this.afs.save(userData, path);

      // Send email verification and return the observable
      const sendEmailVerificationObservable = user.sendEmailVerification();

      // Logout after user registration
      this.logout();

      // Return the observable
      return sendEmailVerificationObservable;
    } catch (error) {
      // Handle registration error
      console.error('Error registering user:', error);
      throw error; // You can handle this error in the component that calls registerUser
    }
  }




  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user!.emailVerified) {
          // this.router.navigateByUrl('home');
          alert('si');
        } else {
          // Email is not verified. You can show a message to the user.
          // Swal.fire("Debe verificar su email antes para poder ingresar!!")
         // this.logout();
        }
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  }

  getUserData() {
    return this.afAuth.user.pipe(
      switchMap(user => {
        if (user) {
          // User is authenticated, so you can use their UID
          console.log(user.uid);
          return this.afs.get('usuarios').pipe(
            map(collection => {
              const userDoc = collection.find(doc => doc['uid'] === user.uid);
              return userDoc;
            })
          );
        } else {
          // User is not authenticated
          return of(null);
        }
      })
    );
  }


  getLoggedUser() {
    return this.afAuth.authState;
  }

  logout() {
    return this.afAuth.signOut();
  }

}
