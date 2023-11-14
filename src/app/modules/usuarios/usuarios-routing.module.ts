// usuarios-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ListaEspecialistasComponent } from './components/lista-especialistas/lista-especialistas.component';
import { ListaPacientesComponent } from './components/lista-pacientes/lista-pacientes.component';

const routes: Routes = [
  {
    path: '', component: UsuariosComponent,
    children: [
      {
        path: 'registro',
        loadChildren: () => import('../registro/registro.module').then(m => m.RegistroModule),
      },
      {
        path: 'especialistas',
        component: ListaEspecialistasComponent,
      },
      {
        path: 'pacientes',
        component: ListaPacientesComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
