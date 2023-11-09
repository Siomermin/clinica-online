import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistroRoutingModule } from './registro-routing.module';
import { TipoRegistroComponent } from './pages/tipo-registro/tipo-registro.component';
import { FormPacienteComponent } from './components/form-paciente/form-paciente.component';
import { FormEspecialistaComponent } from './components/form-especialista/form-especialista.component';


@NgModule({
  declarations: [
    TipoRegistroComponent,
    FormPacienteComponent,
    FormEspecialistaComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    ReactiveFormsModule,
  ]
})
export class RegistroModule { }
