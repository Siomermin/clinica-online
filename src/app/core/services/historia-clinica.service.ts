import { Injectable } from '@angular/core';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  query,
  where,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  private coleccion: any;

  constructor(private firestore: Firestore) {
    this.coleccion = collection(this.firestore, 'historia-clinica');
  }

  getHistoriasClinicas(): Observable<Array<any>> {
    return collectionData(this.coleccion, { idField: 'id' });
  }

  getHistoriaPorPaciente(paciente: string): Observable<Array<any>> {
    const q = query(this.coleccion, where('paciente', '==', paciente));

    // Fetching data from Firestore using the created query and explicitly defining the type
    return collectionData<any>(q, { idField: 'id' }) as Observable<Array<any>>;
  }

  getHistoriaPorEspecialista(especialista: string): Observable<Array<any>> {
    const q = query(this.coleccion, where('especialista', '==', especialista));

    // Fetching data from Firestore using the created query and explicitly defining the type
    return collectionData<any>(q, { idField: 'id' }) as Observable<Array<any>>;
  }

  setHistoriaClinica(historia: any): Promise<DocumentReference<any>> {
    return addDoc(this.coleccion, { ...historia });
  }

  deleteHistoriaClinica(id: string): Promise<void> {
    const documento = doc(this.coleccion, id);
    return deleteDoc(documento);
  }

  updateHistoriaClinica(historia: any): Promise<void> {
    const documento = doc(this.coleccion, historia.id);
    return updateDoc(documento, {
      ...historia,
    });
  }}
