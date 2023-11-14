import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ListaPacientesComponent } from './components/lista-pacientes/lista-pacientes.component';
import { ListaEspecialistasComponent } from './components/lista-especialistas/lista-especialistas.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    ListaPacientesComponent,
    ListaEspecialistasComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
