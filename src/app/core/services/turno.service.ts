import { Injectable } from '@angular/core';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private coleccion: any;

  constructor(private firestore: Firestore) {
    this.coleccion = collection(this.firestore, 'turnos');
  }

  getTurnos(): Observable<Array<any>> {
    return collectionData(this.coleccion, { idField: 'id' });
  }

  setTurno(turno: any): Promise<DocumentReference<any>> {
    return addDoc(this.coleccion, { ...turno });
  }

  deleteTurno(id: string): Promise<void> {
    const documento = doc(this.coleccion, id);
    return deleteDoc(documento);
  }

  updateTurno(turno: any): Promise<void> {
    const documento = doc(this.coleccion, turno.id);
    return updateDoc(documento, {
      ...turno,
    });
  }
}
