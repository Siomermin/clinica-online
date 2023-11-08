import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Firestore, addDoc, collection, collectionData, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  save(data: any, path: string) {
    const col = collection(this.firestore, path);
    return addDoc(col, { ...data });
  }

  get(path: string) {
    const col = collection(this.firestore, path);
    const observable = collectionData(col);

    return observable;
  }

  // New method to get a specific document
  getDocument(path: string, documentId: string) {
    const documentRef = doc(this.firestore, path, documentId);
    return getDoc(documentRef);
  }
}
