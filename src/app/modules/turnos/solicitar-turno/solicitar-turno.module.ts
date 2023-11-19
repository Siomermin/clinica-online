import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitarTurnoRoutingModule } from './solicitar-turno-routing.module';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';
import { ListaEspecialistasTurnoComponent } from './components/lista-especialistas-turno/lista-especialistas-turno.component';
import { ListaHorariosTurnoComponent } from './components/lista-horarios-turno/lista-horarios-turno.component';
import { ListaEspecialidadesComponent } from './components/lista-especialidades/lista-especialidades.component';


@NgModule({
  declarations: [
    SolicitarTurnoComponent,
    ListaEspecialistasTurnoComponent,
    ListaHorariosTurnoComponent,
    ListaEspecialidadesComponent
  ],
  imports: [
    CommonModule,
    SolicitarTurnoRoutingModule
  ],
})
export class SolicitarTurnoModule { }
