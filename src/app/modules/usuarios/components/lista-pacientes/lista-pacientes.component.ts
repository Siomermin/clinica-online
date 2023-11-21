import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { HistoriaClinicaComponent } from 'src/app/modules/historia-clinica/components/historia-clinica/historia-clinica.component';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent {
  pacientes: any;

  constructor(private firestore: FirestoreService, public dialog: MatDialog) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.firestore.getUsuariosPorRol('paciente').subscribe(
      (usuarios) => {
        // Handle success, you have the array of usuarios
        console.log('Usuarios: ', usuarios);
        this.pacientes = usuarios;
      },
      (error) => {
        // Handle error
        console.error('Error fetching documents: ', error);
      }
    );
  }

  openHistoriaClinicaDialog(usuario: any): void {
    const dialogRef = this.dialog.open(HistoriaClinicaComponent, {
      // width: '80%',
      data: { usuarioLogeado: usuario }, // Pass the usuarioLogeado as part of the data
      position: { right: '50%', left: '50%' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



}
