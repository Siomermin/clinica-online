import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from './firestore.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'; // Corrected import for operators

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private afs: FirestoreService, private afStorage: AngularFireStorage) {}

  async registerUser(email: string, password: string, userData: any, imgs: any) {
    try {
      const userCredential: any = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Include the UID in the data to be uploaded to Firestore
      userData.uid = user.uid;

      // Upload images and get download URLs
      const downloadUrls: string[] = await this.uploadImages(user.uid, imgs);

      // Add image URLs to userData
      if (imgs.imagen_a && downloadUrls[0]) {
        userData.imagen_a_url = downloadUrls[0];
      }

      if (imgs.imagen_b && downloadUrls[1]) {
        userData.imagen_b_url = downloadUrls[1];
      }

      // Convert observable values to their final form
      if (userData.imagen_a_url) {
        userData.imagen_a_url = await userData.imagen_a_url.toPromise();
      }

      if (userData.imagen_b_url) {
        userData.imagen_b_url = await userData.imagen_b_url.toPromise();
      }

      // Save userData to Firestore
      await this.afs.setUsuario(userData);

      // Send email verification and return the observable
      const sendEmailVerificationObservable = user.sendEmailVerification();

      // Logout after user registration
      this.logout();

      // Return the observable
      return sendEmailVerificationObservable;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }



  async uploadImages(userId: string, imgs: any): Promise<string[]> {
    const downloadUrls: string[] = [];

    try {
      // Upload image A
      if (imgs.imagen_a) {
        const pathImgA = `userImgs/${userId}/${imgs.imagen_a}`;
        await this.afStorage.upload(pathImgA, imgs.imagen_a_file);
        const downloadUrlA = await this.afStorage.ref(pathImgA).getDownloadURL();
        downloadUrls.push(downloadUrlA as unknown as string);
      }

      // Upload image B
      if (imgs.imagen_b) {
        const pathImgB = `userImgs/${userId}/${imgs.imagen_b}`;
        await this.afStorage.upload(pathImgB, imgs.imagen_b_file);
        const downloadUrlB = await this.afStorage.ref(pathImgB).getDownloadURL();
        downloadUrls.push(downloadUrlB as unknown as string);
      }

      return downloadUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  }

  login(email: string, password: string): Observable<void> {
    return from(
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (!user!.emailVerified) {
            throw new Error('Email is not verified');
          }
        })
    );
  }

  getUserData() {
    return this.afAuth.user.pipe(
      switchMap((user) => {
        if (user) {
          // User is authenticated, so you can use their UID
          console.log(user.uid);
          return this.afs.get('usuarios').pipe(
            map((collection) => {
              const userDoc = collection.find((doc) => doc['uid'] === user.uid);
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
