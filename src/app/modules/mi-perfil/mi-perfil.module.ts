import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MiPerfilComponent
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    FormsModule
  ]
})
export class MiPerfilModule { }
