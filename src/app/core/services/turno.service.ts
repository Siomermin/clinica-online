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
import { query, where } from 'firebase/firestore';
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

  getTurnosPorPaciente(paciente: string): Observable<Array<any>> {
    const q = query(this.coleccion, where('paciente', '==', paciente));

    // Fetching data from Firestore using the created query and explicitly defining the type
    return collectionData<any>(q, { idField: 'id' }) as Observable<Array<any>>;
  }

  getTurnosPorEspecialista(especialista: string): Observable<Array<any>> {
    const q = query(this.coleccion, where('especialista', '==', especialista));

    // Fetching data from Firestore using the created query and explicitly defining the type
    return collectionData<any>(q, { idField: 'id' }) as Observable<Array<any>>;
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
