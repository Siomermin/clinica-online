import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/core/models/Usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent {
  formLogin: FormGroup;
  usuariosAccesoRapido: any;

  get email() {
    return this.formLogin.get('email')!;
  }

  get password() {
    return this.formLogin.get('password')!;
  }

  constructor(private authService: AuthService, private firestore: FirestoreService, private router: Router,  private spinner: NgxSpinnerService) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.firestore.getUsuariosAccesoRapido().subscribe(
      (usuarios) => {
        // Handle success, you have the array of usuarios
        console.log('Usuarios: ', usuarios);
        this.usuariosAccesoRapido = usuarios;
      },
      (error) => {
        // Handle error
        console.error('Error fetching documents: ', error);
      }
    );
      }

  setDatosDeLogin(user: any) {
    this.email.setValue(user.email);
    this.password.setValue(user.email);
    this.formLogin.updateValueAndValidity();
  }

  enviar(): void {
    this.spinner.show();
    if (this.formLogin.valid) {
      this.authService.login(this.email.value, this.password.value).subscribe(
        () => {
          this.spinner.hide();
          Swal.fire('Bienvenido!');
          this.router.navigateByUrl('home');
        },
        (error) => {
          this.spinner.hide();
          console.error('Login failed:', error);
          if (error.message === 'Email is not verified') {
            Swal.fire('Debe verificar su correo electronico para iniciar sesion!');
          } else {
            Swal.fire(error.message);
          }
        }
      );
    }
  }
}
