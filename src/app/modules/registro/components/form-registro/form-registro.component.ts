import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss']
})
export class FormRegistroComponent implements OnChanges   {
  @Input() tipoUsuario!: string; // 'paciente', 'especialista', 'admin'
  rutaImagenA!: string;
  rutaImagenB!: string;

  formRegistro!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }


  get nombre() {
    return this.formRegistro.get('nombre')!;
  }

  get apellido() {
    return this.formRegistro.get('apellido')!;
  }

  get edad() {
    return this.formRegistro.get('edad')!;
  }

  get dni() {
    return this.formRegistro.get('dni')!;
  }

  get obra_social() {
    return this.formRegistro.get('obra_social')!;
  }

  get especialidad() {
    return this.formRegistro.get('especialidad')!;
  }

  get email() {
    return this.formRegistro.get('email')!;
  }

  get password() {
    return this.formRegistro.get('password')!;
  }


  get imagen_a() {
    return this.formRegistro.get('imagen_a')!;
  }

  get imagen_b() {
    return this.formRegistro.get('imagen_b')!;
  }


  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [null, Validators.required],
      dni: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      especialidad: [null, Validators.required],
      obra_social: [null, Validators.required],
      imagen_a: [undefined, Validators.required],
      imagen_b: [undefined, Validators.required],
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipoUsuario'] && !changes['tipoUsuario'].firstChange) {
      // TipoUsuario has changed, update form controls
      this.updateFormControls();
    }
  }

  updateFormControls(): void {
    // Clear existing form controls
    Object.keys(this.formRegistro.controls).forEach(controlName => {
      this.formRegistro.removeControl(controlName);
    });

    // Add new form controls based on tipoUsuario
    if (this.tipoUsuario === 'paciente') {
      this.formRegistro.addControl('obra_social', this.fb.control(null, Validators.required));
      this.formRegistro.addControl('imagen_b', this.fb.control(null, Validators.required)); // Initialize with null
    } else if (this.tipoUsuario === 'especialista') {
      this.formRegistro.addControl('especialidad', this.fb.control(null, Validators.required));
    }

    // Add common form controls
    this.formRegistro.addControl('nombre', this.fb.control('', Validators.required));
    this.formRegistro.addControl('apellido', this.fb.control('', Validators.required));
    this.formRegistro.addControl('edad', this.fb.control(null, Validators.required));
    this.formRegistro.addControl('dni', this.fb.control(null, Validators.required));
    this.formRegistro.addControl('email', this.fb.control('', [Validators.required, Validators.email]));
    this.formRegistro.addControl('password', this.fb.control('', Validators.required));
    this.formRegistro.addControl('imagen_a', this.fb.control(undefined, Validators.required));

    // Reset values for image controls
    this.formRegistro.get('imagen_a')?.setValue(undefined);
    this.formRegistro.get('imagen_b')?.setValue(undefined);

    // Reset image variables
    this.rutaImagenA = '';
    this.rutaImagenB = '';

    // Clear file input
    const inputImagenA = document.getElementById('imagen_a') as HTMLInputElement;
    if (inputImagenA) {
      inputImagenA.value = '';
    }

    const inputImagenB = document.getElementById('imagen_b') as HTMLInputElement;
    if (inputImagenB) {
      inputImagenB.value = '';
    }

      this.formRegistro.reset();
  }

  imagenA_change(event: any) {
    const archivo = event.target.files[0];
    const elementoId = event.target.id;
    const reader = new FileReader();
    this.formRegistro.get(elementoId)?.setValue(archivo);
    reader.readAsDataURL(this.formRegistro.get(elementoId)?.value);

    reader.onload = () => {
      this.rutaImagenA = reader.result as string;
    };
  }

  imagenB_change(event: any) {
    const archivo = event.target.files[0];
    const elementoId = event.target.id;

    const reader = new FileReader();
    this.formRegistro.get(elementoId)?.setValue(archivo);
    reader.readAsDataURL(this.formRegistro.get(elementoId)?.value);

    reader.onload = () => {
      this.rutaImagenB = reader.result as string;
    };
  }

  onSubmit(): void {
    if (this.formRegistro.valid) {
      const data: { [key: string]: any } = {
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        edad: this.edad.value,
        dni: this.dni.value,
        email: this.email.value,
        imagen_a: this.imagen_a.value.name,
      };

      if (this.tipoUsuario === 'paciente') {
        data['imagen_b'] = this.imagen_b.value.name;
        data['obra_social'] = this.obra_social.value;
        data['rol'] = 'paciente';
      }

      if (this.tipoUsuario === 'especialista') {
        data['especialidad'] = this.especialidad.value;
        data['rol'] = 'especialista';
      }

      if (this.tipoUsuario === 'admin') {
        data['rol'] = 'admin';
      }

      this.authService.registerUser(this.email.value, this.password.value, data, 'usuarios')
      .then(() => {
        // Handle success
        Swal.fire("Registro exitoso! Se envió una verificación adicional a su correo electrónico.");
        this.router.navigateByUrl('bienvenida');
      })
      .catch((error) => {
        // Handle error
        Swal.fire(error.message);
        console.error('Error registering user:', error);
      });



    }
  }

}
