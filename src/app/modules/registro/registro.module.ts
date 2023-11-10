import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistroRoutingModule } from './registro-routing.module';
import { TipoRegistroComponent } from './pages/tipo-registro/tipo-registro.component';

import { FormRegistroComponent } from './components/form-registro/form-registro.component';


@NgModule({
  declarations: [
    TipoRegistroComponent,
    FormRegistroComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    ReactiveFormsModule,
  ]
})
export class RegistroModule { }
