import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HistoriaClinicaService } from 'src/app/core/services/historia-clinica.service';

@Component({
  selector: 'app-historia-clinica-tabla',
  templateUrl: './historia-clinica-tabla.component.html',
  styleUrls: ['./historia-clinica-tabla.component.scss']
})
export class HistoriaClinicaTablaComponent {
  usuarioLogeado: any;
  historiaClinica: any;

  constructor(
    private historiaService: HistoriaClinicaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.authService.getUserData().subscribe((data) => {
      this.usuarioLogeado = data;
      console.log(data);

      if (this.usuarioLogeado?.rol == 'especialista') {
        this.historiaService
        .getHistoriaPorEspecialista(this.usuarioLogeado.email)
        .subscribe((data) => {
          this.historiaClinica = data;
          console.log(this.historiaClinica);
        });

      } else {
        this.historiaService
        .getHistoriaPorPaciente(this.usuarioLogeado.email)
        .subscribe((data) => {
          this.historiaClinica = data;
          console.log(this.historiaClinica);
        });
      }

    })


  }
}
