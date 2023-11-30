import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { TurnosListComponent } from './components/turnos-list/turnos-list.component';
import { AccionesTurnoComponent } from './components/acciones-turno/acciones-turno.component';
import { FormsModule } from '@angular/forms';
import { HistoriaClinicaModule } from '../../historia-clinica/historia-clinica.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    MisTurnosComponent,
    TurnosListComponent,
    AccionesTurnoComponent
  ],
  imports: [
    CommonModule,
    MisTurnosRoutingModule,
    FormsModule,
    HistoriaClinicaModule,
    MatDialogModule
  ],
  providers: [DatePipe],
})
export class MisTurnosModule { }
