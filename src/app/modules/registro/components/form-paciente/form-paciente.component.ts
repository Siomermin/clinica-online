import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Paciente } from 'src/app/core/models/Paciente';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.scss'],
})
export class FormPacienteComponent {
  formPaciente!: FormGroup;
  rutaImagenA!: string;
  rutaImagenB!: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  get nombre(): AbstractControl {
    return this.formPaciente.get('nombre')!;
  }

  get apellido(): AbstractControl {
    return this.formPaciente.get('apellido')!;
  }

  get edad(): AbstractControl {
    return this.formPaciente.get('edad')!;
  }

  get dni(): AbstractControl {
    return this.formPaciente.get('dni')!;
  }

  get obra_social(): AbstractControl {
    return this.formPaciente.get('obra_social')!;
  }

  get email(): AbstractControl {
    return this.formPaciente.get('email')!;
  }

  get password(): AbstractControl {
    return this.formPaciente.get('password')!;
  }

  get imagen_a(): AbstractControl {
    return this.formPaciente.get('imagen_a')!;
  }

  get imagen_b(): AbstractControl {
    return this.formPaciente.get('imagen_b')!;
  }

  ngOnInit(): void {
    this.rutaImagenA = '../../../../../assets/imgs/default.jpg';
    this.rutaImagenB = this.rutaImagenA;

    this.formPaciente = this.formBuilder.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      edad: [
        null,
        [Validators.required, Validators.pattern('[0-9]+'), Validators.min(18)],
      ],
      dni: [
        null,
        [
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.minLength(7),
          Validators.maxLength(8),
        ],
      ],
      obra_social: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      imagen_a: [undefined, Validators.required],
      imagen_b: [undefined, Validators.required],
    });
  }

  imagenA_change(event: any) {
    const archivo = event.target.files[0];
    const elementoId = event.target.id;
    const reader = new FileReader();
    this.formPaciente.get(elementoId)?.setValue(archivo);
    reader.readAsDataURL(this.formPaciente.get(elementoId)?.value);

    reader.onload = () => {
      this.rutaImagenA = reader.result as string;
    };
  }

  imagenB_change(event: any) {
    const archivo = event.target.files[0];
    const elementoId = event.target.id;

    const reader = new FileReader();
    this.formPaciente.get(elementoId)?.setValue(archivo);
    reader.readAsDataURL(this.formPaciente.get(elementoId)?.value);

    reader.onload = () => {
      this.rutaImagenB = reader.result as string;
    };
  }

  onSubmit(): void {
    if (this.formPaciente.valid) {
      const pacienteData = {
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        edad: this.edad.value,
        dni: this.dni.value,
        email: this.email.value,
        imagen_a: this.imagen_a.value.name,
        imagen_b: this.imagen_b.value.name,
        obra_social: this.obra_social.value,
        rol: 'paciente'
      };

      // Call the registerUser method from AuthService to register the user
      this.authService.registerUser(this.email.value, this.password.value, pacienteData, 'usuarios').then(() => {
        // Registration success
      }).catch((error) => {
        // Handle registration error
        console.error('Registration failed:', error);
      });
    }
  }

}
