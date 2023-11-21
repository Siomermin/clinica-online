import { Component, Inject, Input } from '@angular/core';
import { HistoriaClinicaService } from 'src/app/core/services/historia-clinica.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss'],
})
export class HistoriaClinicaComponent {
  @Input() usuarioLogeado: any;
  historiaClinica: any;

  constructor(
    private historiaService: HistoriaClinicaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<HistoriaClinicaComponent>
  ) {
    this.usuarioLogeado = data.usuarioLogeado;
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.historiaService
      .getHistoriaPorPaciente(this.usuarioLogeado.email)
      .subscribe((data) => {
        this.historiaClinica = data;
        console.log(this.historiaClinica);
      });
  }

  // Function to close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }
}
