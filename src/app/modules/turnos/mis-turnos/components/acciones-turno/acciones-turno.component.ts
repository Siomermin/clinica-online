import { Component, Input } from '@angular/core';
import { TurnoService } from '../../../../../core/services/turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acciones-turno',
  templateUrl: './acciones-turno.component.html',
  styleUrls: ['./acciones-turno.component.scss'],
})
export class AccionesTurnoComponent {
  @Input() turno: any;
  @Input() usuarioLogeado: any;

  turnoCopia: any;

  constructor(private turnoService: TurnoService) {}

  ngOnInit(): void {
    console.log(this.turno);
    this.turnoCopia = this.turno;
  }

  cambiarEstadoTurno(estado: string): void {
    if (estado != 'Aceptado') {
      let titulo = '';
      if (estado == 'Cancelado') {
        titulo = 'Porque que cancela su turno?';
      } else if (estado == 'Rechazado') {
        titulo = 'Porque que rechaza su turno?';
      } else {
        titulo = 'Cual fue el diagnostico del paciente?';
      }

      Swal.fire({
        title: titulo,
        text: 'Escriba abajo:',
        input: 'text',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          console.log(result.value);

          this.turnoCopia.resenia = result.value;
          this.turnoCopia.estado = estado;
          this.turnoService.updateTurno(this.turnoCopia);
        }
      });
    } else {
      this.turnoCopia.estado = estado;
      this.turnoService.updateTurno(this.turnoCopia);
    }
  }

  verResenia() {
    if (this.turno.resenia) {
      Swal.fire(this.turno.resenia);
    }
  }

  calificarAtencion() {
    Swal.fire({
      title: 'Califique la atencion',
      text: 'Escriba abajo:',
      input: 'text',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        console.log(result.value);

        this.turnoCopia.atencion = result.value;
        this.turnoService.updateTurno(this.turnoCopia);
      }
    });
  }
}
