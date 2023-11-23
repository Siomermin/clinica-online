import { Component, Input } from '@angular/core';
import { TurnoService } from '../../../../../core/services/turno.service';
import Swal from 'sweetalert2';
import { HistoriaClinicaService } from 'src/app/core/services/historia-clinica.service';

@Component({
  selector: 'app-acciones-turno',
  templateUrl: './acciones-turno.component.html',
  styleUrls: ['./acciones-turno.component.scss'],
})
export class AccionesTurnoComponent {
  @Input() turno: any;
  @Input() usuarioLogeado: any;

  altura: number = 0;
  peso: number = 0;
  temperatura: number = 0;
  presion: number = 0;
  clave: string = '';
  valor: number = 0;
  turnoCopia: any;

  constructor(private turnoService: TurnoService, private historiaService: HistoriaClinicaService) {}

  ngOnInit(): void {
    this.turnoCopia = this.turno;
  }

  // Modify the cambiarEstadoTurno method to handle 'Finalizado' state
  cambiarEstadoTurno(estado: string): void {
    if (estado === 'Finalizado') {
      // Show the form for additional data
      Swal.fire({
        title: 'Completar historia clinica:',
        html: `
             <div>
              <label for="altura">Altura:</label>
              <input type="number" id="altura" [(ngModel)]="altura" class="swal2-input">
             <div>
             <div>
              <label for="peso">Peso:</label>
              <input type="number" id="peso" [(ngModel)]="peso" class="swal2-input">
             </div>
             <div>
              <label for="temperatura">Temperatura:</label>
              <input type="number" id="temperatura" [(ngModel)]="temperatura" class="swal2-input">
             </div>
             <div>
              <label for="presion">Presión:</label>
              <input type="number" id="presion" [(ngModel)]="presion" class="swal2-input">
             </div>
             <div>
             <label>Dato dinamico:</label>
             </div>
             <div>
             <label for="clave">Clave:</label>
             <input type="text" id="clave" [(ngModel)]="clave" class="swal2-input">
           </div>
           <div>
             <label for="valor">Valor:</label>
             <input type="number" id="valor" [(ngModel)]="valor" class="swal2-input">
           </div>
           `,
        showCancelButton: true,
        preConfirm: async () => {
          // Use async/await to wait for user input

          // Update the values before capturing them
          this.altura = parseFloat((document.getElementById('altura') as HTMLInputElement).value);
          this.peso = parseFloat((document.getElementById('peso') as HTMLInputElement).value);
          this.temperatura = parseFloat((document.getElementById('temperatura') as HTMLInputElement).value);
          this.presion = parseFloat((document.getElementById('presion') as HTMLInputElement).value);
          this.clave = (document.getElementById('clave') as HTMLInputElement).value;
          this.valor = parseFloat((document.getElementById('valor') as HTMLInputElement).value);


          // Handle the form data
          // Update the turno with the additional data
          const historiaClinica: any = {
            altura: this.altura,
            peso: this.peso,
            temperatura: this.temperatura,
            presion: this.presion,
            paciente: this.turnoCopia.paciente,
            especialista: this.turnoCopia.especialista,
            especialidad: this.turnoCopia.especialidad
          };

          // Check if clave and valor are provided, then add them to historiaClinica
          if (this.clave && this.valor !== undefined) {
            historiaClinica[this.clave] = this.valor;
          }

          const result = await Swal.fire({
            title: 'Cual fue el diagnostico del paciente?',
            text: 'Escriba abajo:',
            input: 'text',
            showCancelButton: true,
          });

          if (result.value) {

            this.turnoCopia.resenia = result.value;
            this.turnoCopia.estado = estado;
            this.turnoCopia.historiaClinica = [historiaClinica];
            this.turnoService.updateTurno(this.turnoCopia);
            this.historiaService.setHistoriaClinica(historiaClinica);
          }
        },
      });
    } else {
      if (estado != 'Aceptado') {
        let titulo = '';
        if (estado == 'Cancelado') {
          titulo = 'Porque que cancela su turno?';
        } else if (estado == 'Rechazado') {
          titulo = 'Porque que rechaza su turno?';
        }
        Swal.fire({
          title: titulo,
          text: 'Escriba abajo:',
          input: 'text',
          showCancelButton: true,
        }).then((result) => {
          if (result.value) {

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

        this.turnoCopia.atencion = result.value;
        this.turnoService.updateTurno(this.turnoCopia);
      }
    });
  }
}
