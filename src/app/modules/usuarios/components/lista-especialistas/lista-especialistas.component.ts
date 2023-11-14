import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.scss'],
})
export class ListaEspecialistasComponent {
  especialistas: any;

  constructor(private firestore: FirestoreService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.firestore.getUsuariosPorRol('especialista').subscribe(
      (usuarios) => {
        // Handle success, you have the array of usuarios
        console.log('Usuarios: ', usuarios);
        this.especialistas = usuarios;
      },
      (error) => {
        // Handle error
        console.error('Error fetching documents: ', error);
      }
    );
  }

  actualizarVerificado(usuario: any) {
    usuario.verificado = usuario.verificado === 't' ? 'f' : 't';

    this.firestore.updateUsuario(usuario);
  }

}
