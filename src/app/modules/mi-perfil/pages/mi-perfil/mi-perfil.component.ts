import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent {

  usuarioLogeado: any;
  modulo!: any;
  modulos = [
    {
      dia: 'Lunes',
      horarios: [
        { valor: '08:00', activo: false }, { valor: '08:30', activo: false }, { valor: '09:00', activo: false }, { valor: '09:30', activo: false },
        { valor: '10:00', activo: false }, { valor: '10:30', activo: false }, { valor: '11:00', activo: false }, { valor: '11:30', activo: false },
        { valor: '12:00', activo: false }, { valor: '12:30', activo: false }, { valor: '13:00', activo: false }, { valor: '13:30', activo: false },
        { valor: '14:00', activo: false }, { valor: '14:30', activo: false }, { valor: '15:00', activo: false }, { valor: '15:30', activo: false },
        { valor: '16:00', activo: false }, { valor: '16:30', activo: false }, { valor: '17:00', activo: false }, { valor: '17:30', activo: false },
        { valor: '18:00', activo: false }, { valor: '18:30', activo: false }
      ],
      activo: false
    },
    {
      dia: 'Martes',
      horarios: [
        { valor: '08:00', activo: false }, { valor: '08:30', activo: false }, { valor: '09:00', activo: false }, { valor: '09:30', activo: false },
        { valor: '10:00', activo: false }, { valor: '10:30', activo: false }, { valor: '11:00', activo: false }, { valor: '11:30', activo: false },
        { valor: '12:00', activo: false }, { valor: '12:30', activo: false }, { valor: '13:00', activo: false }, { valor: '13:30', activo: false },
        { valor: '14:00', activo: false }, { valor: '14:30', activo: false }, { valor: '15:00', activo: false }, { valor: '15:30', activo: false },
        { valor: '16:00', activo: false }, { valor: '16:30', activo: false }, { valor: '17:00', activo: false }, { valor: '17:30', activo: false },
        { valor: '18:00', activo: false }, { valor: '18:30', activo: false }
      ],
      activo: false
    },
    {
      dia: 'Miércoles',
      horarios: [
        { valor: '08:00', activo: false }, { valor: '08:30', activo: false }, { valor: '09:00', activo: false }, { valor: '09:30', activo: false },
        { valor: '10:00', activo: false }, { valor: '10:30', activo: false }, { valor: '11:00', activo: false }, { valor: '11:30', activo: false },
        { valor: '12:00', activo: false }, { valor: '12:30', activo: false }, { valor: '13:00', activo: false }, { valor: '13:30', activo: false },
        { valor: '14:00', activo: false }, { valor: '14:30', activo: false }, { valor: '15:00', activo: false }, { valor: '15:30', activo: false },
        { valor: '16:00', activo: false }, { valor: '16:30', activo: false }, { valor: '17:00', activo: false }, { valor: '17:30', activo: false },
        { valor: '18:00', activo: false }, { valor: '18:30', activo: false }
      ],
      activo: false
    },
    {
      dia: 'Jueves',
      horarios: [
        { valor: '08:00', activo: false }, { valor: '08:30', activo: false }, { valor: '09:00', activo: false }, { valor: '09:30', activo: false },
        { valor: '10:00', activo: false }, { valor: '10:30', activo: false }, { valor: '11:00', activo: false }, { valor: '11:30', activo: false },
        { valor: '12:00', activo: false }, { valor: '12:30', activo: false }, { valor: '13:00', activo: false }, { valor: '13:30', activo: false },
        { valor: '14:00', activo: false }, { valor: '14:30', activo: false }, { valor: '15:00', activo: false }, { valor: '15:30', activo: false },
        { valor: '16:00', activo: false }, { valor: '16:30', activo: false }, { valor: '17:00', activo: false }, { valor: '17:30', activo: false },
        { valor: '18:00', activo: false }, { valor: '18:30', activo: false }
      ],
      activo: false
    },
    {
      dia: 'Viernes',
      horarios: [
        { valor: '08:00', activo: false }, { valor: '08:30', activo: false }, { valor: '09:00', activo: false }, { valor: '09:30', activo: false },
        { valor: '10:00', activo: false }, { valor: '10:30', activo: false }, { valor: '11:00', activo: false }, { valor: '11:30', activo: false },
        { valor: '12:00', activo: false }, { valor: '12:30', activo: false }, { valor: '13:00', activo: false }, { valor: '13:30', activo: false },
        { valor: '14:00', activo: false }, { valor: '14:30', activo: false }, { valor: '15:00', activo: false }, { valor: '15:30', activo: false },
        { valor: '16:00', activo: false }, { valor: '16:30', activo: false }, { valor: '17:00', activo: false }, { valor: '17:30', activo: false },
        { valor: '18:00', activo: false }, { valor: '18:30', activo: false }
      ],
      activo: false
    },
    {
      dia: 'Sábado',
      horarios: [
        { valor: '08:00', activo: false }, { valor: '08:30', activo: false }, { valor: '09:00', activo: false }, { valor: '09:30', activo: false },
        { valor: '10:00', activo: false }, { valor: '10:30', activo: false }, { valor: '11:00', activo: false }, { valor: '11:30', activo: false },
        { valor: '12:00', activo: false }, { valor: '12:30', activo: false }, { valor: '13:00', activo: false }, { valor: '13:30', activo: false }
      ],
      activo: false
    },
  ];

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
