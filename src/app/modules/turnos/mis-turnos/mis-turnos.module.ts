import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { TurnosListComponent } from './components/turnos-list/turnos-list.component';


@NgModule({
  declarations: [
    MisTurnosComponent,
    TurnosListComponent
  ],
  imports: [
    CommonModule,
    MisTurnosRoutingModule
  ]
})
export class MisTurnosModule { }