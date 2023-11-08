import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './core/pages/bienvenida/bienvenida.component';

const routes: Routes = [
  {
    path: '', // Redirect from an empty path
    redirectTo: 'bienvenida', // Redirect to the 'bienvenida' route
    pathMatch: 'full', // Ensure a full match
  },
  {
    path: 'bienvenida', // Define the 'bienvenida' route
    component: BienvenidaComponent,
  },
  {
    path: 'registro',
    loadChildren: () => import('./modules/registro/registro.module').then(m => m.RegistroModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
