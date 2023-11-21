import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriaClinicaTablaComponent } from './components/historia-clinica-tabla/historia-clinica-tabla.component';

const routes: Routes = [
  {
    path: '', component: HistoriaClinicaTablaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriaClinicaRoutingModule { }

// Export the routes directly
