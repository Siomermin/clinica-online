import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-turnos-list',
  templateUrl: './turnos-list.component.html',
  styleUrls: ['./turnos-list.component.scss'],
})
export class TurnosListComponent implements OnChanges {
  @Input() turnos: any;
  originalTurnos: any; // Store the original array of turnos
  usuarioLogeado: any; // Declare usuarioLogeado as an input property
  formBusqueda: FormGroup;
  terminoBusqueda: string = ''; // New variable to store the search term

  constructor(
    private datePipe: DatePipe,
    private firestore: FirestoreService,
    private auth: AuthService
  ) {
    this.formBusqueda = new FormGroup({
      busqueda: new FormControl(null),
      criterio: new FormControl(null),
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.auth.getUserData().subscribe((data) => {
      this.usuarioLogeado = data;
      console.log(this.usuarioLogeado);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['turnos'] && changes['turnos'].currentValue) {
      this.processTurnos(changes['turnos'].currentValue);
    }
  }

  private processTurnos(turnos: any): void {
    this.originalTurnos = [...turnos]; // Make a copy of the original array

    turnos.forEach((turno: any) => {
      const pacienteEmail = turno.paciente;
      const especialistaEmail = turno.especialista;

      this.firestore
        .getUsuarioPorEmail(pacienteEmail)
        .pipe(take(1))
        .subscribe((paciente) => {
          turno.pacienteDetalles = paciente[0];
        });

      this.firestore
        .getUsuarioPorEmail(especialistaEmail)
        .pipe(take(1))
        .subscribe((especialista) => {
          turno.especialistaDetalles = especialista[0];
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
    if (this.terminoBusqueda) {
      if (this.usuarioLogeado.rol != 'especialista') {
        this.turnos = this.originalTurnos?.filter(
          (t: any) =>
            t.especialidad.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
            t.especialistaDetalles.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        );
      } else if (this.usuarioLogeado.rol == 'especialista') {
        this.turnos = this.originalTurnos?.filter(
          (t: any) =>
            t.pacienteDetalles.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
            t.especialistaDetalles.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        );
      }

    } else {
      // Reset to the original array if the search term is empty
      this.turnos = [...this.originalTurnos];
    }
  }

  formatDateTime(timestamp: { seconds: number; nanoseconds: number }): string {
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6
    );
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }
}
