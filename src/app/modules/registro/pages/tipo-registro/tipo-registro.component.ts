import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tipo-registro',
  templateUrl: './tipo-registro.component.html',
  styleUrls: ['./tipo-registro.component.scss']
})
export class TipoRegistroComponent {
  userData: any; // Create a variable to hold user data
  tipoUsuario: string = 'paciente';
  tipoUsuarioSeleccionado: string = 'paciente';

  constructor(private authService: AuthService) {}

  seleccionarTipoUsuario(tipoUsuario: string): void {
    this.tipoUsuario = tipoUsuario;
    this.tipoUsuarioSeleccionado = tipoUsuario;
  }

  ngOnInit() {
    // Use the authService to get the user data
    // this.authService.getUserData().subscribe(data => {
    //   if (data) {
    //     this.userData = data;

    //     console.log(this.userData);
    //     // Now 'this.userData' contains the user data
    //   }
    // });
  }
}
