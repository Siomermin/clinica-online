import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss']
})
export class FormRegistroComponent implements OnChanges   {
  @Input() tipoUsuario!: string; // 'paciente', 'especialista', 'admin'
  usuarioLogeado: any; // Create a variable to hold user data
  rutaImagenA!: string;
  rutaImagenB!: string;
  imagenAFile: any;
  imagenBFile: any;
  formRegistro!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) {
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

  get otraEspecialidad() {
    return this.formRegistro.get('otraEspecialidad')!;
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
      otraEspecialidad: ['', Validators.required],
      obra_social: [null, Validators.required],
      imagen_a: [undefined, Validators.required],
      imagen_b: [undefined, Validators.required],
    });

    this.authService.getUserData().subscribe(data => {
      if (data) {
        this.usuarioLogeado = data;

        console.log(this.usuarioLogeado);
        // Now 'this.userData' contains the user data
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Cuando cambia el tipo de usuario
    if (changes['tipoUsuario'] && !changes['tipoUsuario'].firstChange) {
      this.updateFormControls();
    }
  }

  updateFormControls(): void {
    Object.keys(this.formRegistro.controls).forEach(controlName => {
      this.formRegistro.removeControl(controlName);
    });

    //  Form control especificos
    if (this.tipoUsuario === 'paciente') {
      this.formRegistro.addControl('obra_social', this.fb.control(null, Validators.required));
      this.formRegistro.addControl('imagen_b', this.fb.control(null, Validators.required)); // Initialize with null
    } else if (this.tipoUsuario === 'especialista') {
      this.formRegistro.addControl('especialidad', this.fb.control(null, Validators.required));
      this.formRegistro.addControl('otraEspecialidad', this.fb.control('', Validators.required));
    }

    // Form control que van en todos los tipos de formulario admin, paciente y especialista.
    this.formRegistro.addControl('nombre', this.fb.control('', Validators.required));
    this.formRegistro.addControl('apellido', this.fb.control('', Validators.required));
    this.formRegistro.addControl('edad', this.fb.control(null, Validators.required));
    this.formRegistro.addControl('dni', this.fb.control(null, Validators.required));
    this.formRegistro.addControl('email', this.fb.control('', [Validators.required, Validators.email]));
    this.formRegistro.addControl('password', this.fb.control('', Validators.required));
    this.formRegistro.addControl('imagen_a', this.fb.control(undefined, Validators.required));

    this.formRegistro.get('imagen_a')?.setValue(undefined);
    this.formRegistro.get('imagen_b')?.setValue(undefined);

    this.rutaImagenA = '';
    this.rutaImagenB = '';

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

  onEspecialidadChange(event: any) {
    const selectedEspecialidad = event.target.value;

    // Show or hide the input field based on the selected option
    if (selectedEspecialidad === 'Otra') {
      this.formRegistro.get('otraEspecialidad')!.enable();
    } else {
      this.formRegistro.get('otraEspecialidad')!.disable();
    }
  }


  imagenA_change(event: any) {
    const archivo = event.target.files[0];
    const elementoId = event.target.id;
    const reader = new FileReader();
    this.formRegistro.get(elementoId)?.setValue(archivo);
    reader.readAsDataURL(this.formRegistro.get(elementoId)?.value);

    this.imagenAFile = archivo;

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

    this.imagenBFile = archivo;

    reader.onload = () => {
      this.rutaImagenB = reader.result as string;
    };
  }

  async  onSubmit(): Promise<void> {
    if (this.formRegistro.valid) {
      this.spinner.show();
      const data: { [key: string]: any } = {
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        edad: this.edad.value,
        dni: this.dni.value,
        email: this.email.value,
        imagen_a: this.imagen_a.value.name,
      };

      const imgs: { [key: string]: any } = {
        imagen_a: this.imagen_a.value.name,
        imagen_a_file: this.imagenAFile instanceof Observable ? await this.imagenAFile.toPromise() : this.imagenAFile
      };

      if (this.tipoUsuario === 'paciente') {
        data['imagen_b'] = this.imagen_b.value.name;
        data['obra_social'] = this.obra_social.value;
        data['rol'] = 'paciente';

        imgs['imagen_b'] = this.imagen_b.value.name;
        imgs['imagen_b_file'] = this.imagenBFile instanceof Observable ? await this.imagenBFile.toPromise() : this.imagenBFile;
      }

      if (this.tipoUsuario === 'especialista') {
        if (this.especialidad.value == 'Otra') {
          data['especialidad'] = this.otraEspecialidad.value;
        }
        else {
          data['especialidad'] = this.especialidad.value;
        }
        data['rol'] = 'especialista';
        data['verificado'] = 'f';
      }

      if (this.tipoUsuario === 'admin') {
        data['rol'] = 'admin';
      }

      this.authService.registerUser(this.email.value, this.password.value, data, imgs)
      .then(() => {
        this.spinner.hide();
        Swal.fire("Registro exitoso! Se envió una verificación adicional a su correo electrónico.");
        // if (this.usuarioLogeado) {
        //   this.router.navigateByUrl('usuarios');
        // }
        // else {
          this.router.navigateByUrl('bienvenida');
        //}
      })
      .catch((error) => {
        this.spinner.hide();
        Swal.fire(error.message);
        console.error('Error registering user:', error);
      });
    }
  }

}
