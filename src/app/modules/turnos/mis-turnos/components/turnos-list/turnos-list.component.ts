import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-turnos-list',
  templateUrl: './turnos-list.component.html',
  styleUrls: ['./turnos-list.component.scss'],
})
export class TurnosListComponent implements OnChanges {
  @Input() turnos: any;
  @Input() usuarioLogeado: any; // Declare usuarioLogeado as an input property
  formBusqueda: FormGroup;

  constructor(private datePipe: DatePipe, private firestore: FirestoreService) {
    this.formBusqueda = new FormGroup({
      busqueda: new FormControl(null),
      criterio: new FormControl(null),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['turnos'] && changes['turnos'].currentValue) {
      this.processTurnos(changes['turnos'].currentValue);
    }
  }

  private processTurnos(turnos: any): void {
    turnos.forEach((turno: any) => {
      const pacienteEmail = turno.paciente;
      const especialistaEmail = turno.especialista;

      // Fetch user data for paciente
      this.firestore.getUsuarioPorEmail(pacienteEmail).pipe(take(1)).subscribe((paciente) => {
        turno.pacienteDetalles = paciente[0]; // Assuming the result is an array, update accordingly
        console.log(turno);
      });

      // Fetch user data for especialista
      this.firestore.getUsuarioPorEmail(especialistaEmail).pipe(take(1)).subscribe((especialista) => {
        turno.especialistaDetalles = especialista[0]; // Assuming the result is an array, update accordingly
        console.log(turno);
      });
    });
  }




  get busqueda() {
    return this.formBusqueda.get('busqueda');
  }
  get criterio() {
    return this.formBusqueda.get('criterio');
  }

  buscar() {
    if (this.criterio?.value === 'especialidad') {
      this.turnos = this.turnos?.filter(
        (t: { especialidad: string; }) =>
          t.especialidad.toLowerCase() === this.busqueda?.value.toLowerCase()
      );
    } else if (this.criterio?.value === 'especialista') {
      this.turnos = this.turnos?.filter(
        (t: { especialista: string; }) =>
          t.especialista.toLowerCase() === this.busqueda?.value.toLowerCase()
      );
    }
  }

  formatDateTime(timestamp: { seconds: number; nanoseconds: number }): string {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }

}
