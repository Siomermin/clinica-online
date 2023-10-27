import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';

const firebaseConfig = {
  apiKey: "AIzaSyAv0lL-0aMDKB7VUkC9o1yDVox55dYA7QI",
  authDomain: "clinica-online-587ae.firebaseapp.com",
  projectId: "clinica-online-587ae",
  storageBucket: "clinica-online-587ae.appspot.com",
  messagingSenderId: "293585135373",
  appId: "1:293585135373:web:4dcaf2104f201cf94d7244",
  measurementId: "G-KJMXCM2WD5"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    provideFirebaseApp(() => initializeApp({"projectId":"clinica-online-587ae","appId":"1:293585135373:web:4dcaf2104f201cf94d7244","storageBucket":"clinica-online-587ae.appspot.com","apiKey":"AIzaSyAv0lL-0aMDKB7VUkC9o1yDVox55dYA7QI","authDomain":"clinica-online-587ae.firebaseapp.com","messagingSenderId":"293585135373","measurementId":"G-KJMXCM2WD5"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
