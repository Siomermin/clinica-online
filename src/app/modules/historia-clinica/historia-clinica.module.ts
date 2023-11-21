import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriaClinicaComponent } from './components/historia-clinica/historia-clinica.component';
import { HistoriaClinicaTablaComponent } from './components/historia-clinica-tabla/historia-clinica-tabla.component';
import { HistoriaClinicaRoutingModule } from './historia-clinica-routing.module';

@NgModule({
  declarations: [HistoriaClinicaComponent, HistoriaClinicaTablaComponent],
  imports: [CommonModule],
  exports: [HistoriaClinicaRoutingModule, HistoriaClinicaComponent, HistoriaClinicaTablaComponent],
})
export class HistoriaClinicaModule { }
