import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoRegistroComponent } from './pages/tipo-registro/tipo-registro.component';
import { FormPacienteComponent } from './components/form-paciente/form-paciente.component';
import { FormEspecialistaComponent } from './components/form-especialista/form-especialista.component';

const routes: Routes = [
  {
    path: '', component: TipoRegistroComponent,
    children: [
      {
        path: 'paciente',
        component: FormPacienteComponent
      },
      {
        path: 'especialista',
        component: FormEspecialistaComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
