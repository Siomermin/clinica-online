import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-lista-especialidades',
  templateUrl: './lista-especialidades.component.html',
  styleUrls: ['./lista-especialidades.component.scss']
})
export class ListaEspecialidadesComponent {
  @Input() especialistaSeleccionado: any;
  @Output() especialidadSeleccionada: EventEmitter<any> = new EventEmitter<any>();

  especialidades: any;
  especialidad: any;


  seleccionarEspecialidad(especialidad: any): void {
    this.especialidad = especialidad;
    this.especialidadSeleccionada.emit(especialidad);
    console.log(this.especialidad);
  }

   // Function to check if the especialista is selected
   seleccionado(especialidad: any): boolean {
    return this.especialidad === especialidad;
  }
}
