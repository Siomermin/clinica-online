import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/core/models/Usuario';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent {
  formLogin: FormGroup;
  // testUsers: Promise<Usuario[]>;

  get email() {
    return this.formLogin.get('email')!;
  }

  get password() {
    return this.formLogin.get('password')!;
  }

  constructor(private authService: AuthService, private router: Router,  private spinner: NgxSpinnerService) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    // this.testUsers = this.authService.getTestUsers();
  }

  setDatosDeLogin(usuario: Usuario) {
    this.email.setValue(usuario.mail);
    this.password.setValue(usuario.mail);
    this.formLogin.updateValueAndValidity();
  }

  enviar(): void {
    this.spinner.show();
    if (this.formLogin.valid) {
      this.authService.login(this.email.value, this.password.value);
      this.spinner.hide();

    }
  }
}
