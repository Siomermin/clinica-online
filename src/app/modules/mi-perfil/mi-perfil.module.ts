import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { FormsModule } from '@angular/forms';
import { HistoriaClinicaModule } from '../historia-clinica/historia-clinica.module';


@NgModule({
  declarations: [
    MiPerfilComponent
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    FormsModule,
    HistoriaClinicaModule
  ]
})
export class MiPerfilModule { }
