import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from './firestore.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'; // Corrected import for operators
import Swal from 'sweetalert2';
import { SpinnerService } from './spinner.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afs: FirestoreService, private router: Router, private spinner: SpinnerService) { }

  registerUser(email: string, password: string, userData: any, path: string) {
    try {
      this.spinner.mostrar();
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential: any) => {
          const user = userCredential.user;

          // Incluyo el uid en la data que voy a subir a firestore
          userData.uid = user.uid;

          return this.afs.save(userData, path).then(() => {

            user.sendEmailVerification()
              .then(() => {

                this.logout();
                Swal.fire("Registro exitoso! Se envio una verificacion adicional a su correo electronico.");
                this.router.navigateByUrl('bienvenida');

              })
              .catch((error: any) => {
                // Handle the error
                console.error('Error sending email verification:', error);
              });
          });
        });
    } finally {
    this.spinner.esconder();
  }
  }




  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user!.emailVerified) {
          this.router.navigateByUrl('home');
        } else {
          // Email is not verified. You can show a message to the user.
          Swal.fire("Debe verificar su email antes para poder ingresar!!")
          this.logout();
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
