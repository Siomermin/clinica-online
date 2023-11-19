import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';
import { TurnoService } from 'src/app/core/services/turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent {
  paciente: any;
  especialista: any;
  especialidad: any;

  fechaSeleccionada!: Date;
  horaSeleccionada!: Date;

  constructor(private authService: AuthService, private turnoService: TurnoService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
   this.authService.getUserData().subscribe(user => {
      // Perform actions with the user object, e.g., check if the user is logged in
      if (user) {
        this.paciente = user;
        console.log('User is logged in:', user);
      } else {
        console.log('User is not logged in');
      }
    });
    console.log(this.paciente);
  }

  onEspecialistaSeleccionado(seleccionado: any): void {
    this.especialista = seleccionado;
    // You can perform additional actions based on the selected especialista
    console.log('Especialista seleccionado:', this.especialista);
  }

  onEspecialidadSeleccionada(seleccionado: any): void {
    this.especialidad = seleccionado;
    // You can perform additional actions based on the selected especialista
    console.log('Especialidad seleccionado:', this.especialidad);
  }

  onFechaHoraSeleccionada(event: { fecha: Date, hora: Date }): void {
    this.fechaSeleccionada = event.fecha;
    this.horaSeleccionada = event.hora;
    // Optionally, you can perform additional actions based on the selected fecha and hora
  }

  solicitarTurno(): void {
    const fechaTurno = this.fechaSeleccionada;

    fechaTurno.setHours(this.horaSeleccionada.getHours());
    fechaTurno.setMinutes(this.horaSeleccionada.getMinutes());
    fechaTurno.setSeconds(0);

    // const turno = new Turno(this.paciente.mail, this.especialista.mail, this.especialidad, this.fecha);

    const turno = {
      paciente: this.paciente.email,
      especialista: this.especialista.email,
      especialidad: this.especialidad,
      fecha: fechaTurno,
      estado: 'Solicitado'
    }

    console.log(turno);

    this.turnoService.setTurno(turno)
    .then(() => {
      this.spinner.hide();
      Swal.fire("Turno registrado!.");

    })
    .catch((error) => {
      this.spinner.hide();
      Swal.fire(error.message);
      console.error('Error registrando el turno:', error);
    });
  }
}
