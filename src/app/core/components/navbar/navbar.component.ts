import { Component } from '@angular/core';
import { Router } from '@angular/router';


import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  loggedUser = this.authService.getLoggedUser();

  constructor( private authService: AuthService, private router: Router ) {}

  logout(): void {
    Swal.fire({
      title: '¿Estás seguro de cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, nos vemos!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().then( res => {
          this.router.navigateByUrl('/bienvenida');
        }, err => {
          Swal.fire(err);
        }
        );
      }
    })
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  goBienvenida() {
    this.router.navigateByUrl('/bienvenida');
  }

}
