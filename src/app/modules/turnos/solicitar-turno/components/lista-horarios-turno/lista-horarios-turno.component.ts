import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lista-horarios-turno',
  templateUrl: './lista-horarios-turno.component.html',
  styleUrls: ['./lista-horarios-turno.component.scss']
})
export class ListaHorariosTurnoComponent {
  @Input() especialistaSeleccionado: any;
  @Output() fechaHoraSeleccionada: EventEmitter<{ fecha: Date, hora: Date }> = new EventEmitter<{ fecha: Date, hora: Date }>();
  fechas: Date[] = [];
  horas: Date[] = [];
  fecha!: Date;
  hora!: Date;

  get dias(): number {
    return 15;
  }

  get modulos(): number {
    return (19 - 8) * 2;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    for (let i = 1; i <= this.dias; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      if (date.toLocaleDateString('es-AR', { weekday: 'long' }) !== 'domingo') {
        this.fechas.push(date);
      }
    }

    for (let i = 0; i < this.modulos; i++) {
      const hora = new Date();
      hora.setHours(8 + i / 2);
      if (i % 2) {
        hora.setMinutes(30);
      } else {
        hora.setMinutes(0);
      }
      this.horas.push(hora);
    }
  }

  seleccionarFecha(fecha: Date): void {
    this.fecha = fecha;
    this.emitFechaHora();

  }

  seleccionarHora(hora: Date): void {
    this.hora = hora;
    this.emitFechaHora();
  }

  private emitFechaHora(): void {
    if (this.fecha && this.hora) {
      this.fechaHoraSeleccionada.emit({ fecha: this.fecha, hora: this.hora });
    }
  }

   // Function to check if the date is selected
   isSelectedFecha(fecha: Date): boolean {
    return this.fecha === fecha;
  }

  // Function to check if the time is selected
  isSelectedHora(hora: Date): boolean {
    return this.hora === hora;
  }
}
