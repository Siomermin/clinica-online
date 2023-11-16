import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent {

  usuarioLogeado: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    //Use the authService to get the user data
    this.authService.getUserData().subscribe(data => {
      if (data) {
        this.usuarioLogeado = data;

        console.log(this.usuarioLogeado);
        // Now 'this.userData' contains the user data
      }
    });
  }



}
