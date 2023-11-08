import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-especialista',
  templateUrl: './form-especialista.component.html',
  styleUrls: ['./form-especialista.component.scss']
})
export class FormEspecialistaComponent {
  formEspecialista!: FormGroup;
  rutaImagenA!: string;
  rutaImagenB!: string;

  constructor(private formBuilder: FormBuilder) {}

  get nombre() {
    return this.formEspecialista.get('nombre');
  }

  get apellido() {
    return this.formEspecialista.get('apellido');
  }

  get edad() {
    return this.formEspecialista.get('edad');
  }

  get dni() {
    return this.formEspecialista.get('dni');
  }

  get especialidad() {
    return this.formEspecialista.get('especialidad');
  }

  get email() {
    return this.formEspecialista.get('email');
  }

  get password() {
    return this.formEspecialista.get('password');
  }

  get imagen_a() {
    return this.formEspecialista.get('imagen_a');
  }

  ngOnInit(): void {
    this.rutaImagenA = '../../../../../assets/imgs/default.jpg';
    this.rutaImagenB = this.rutaImagenA;

    this.formEspecialista = this.formBuilder.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      edad: [null, [Validators.required, Validators.pattern('[0-9]+'), Validators.min(18)]],
      dni: [null, [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(7), Validators.maxLength(8)]],
      especialidad: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      imagen_a: [undefined, Validators.required],
      imagen_b: [undefined, Validators.required],
    });
  }

  imagenA_change(event: any) {
    const archivo = event.target.files[0];
    const elementoId = event.target.id;

    // if (event.target.files && event.target.files.length
    //   && archivo.size < 100 * 1024) {
      const reader = new FileReader();
      this.formEspecialista.get(elementoId)?.setValue(archivo);
      reader.readAsDataURL(this.formEspecialista.get(elementoId)?.value);

      reader.onload = () => {
        this.rutaImagenA = reader.result as string;
      };
    // } else {
    //   event.target.value = '';
    // }
  }



  onSubmit(): void {
    if (this.formEspecialista.valid) {
      console.log(this.formEspecialista.value);
    }
    else {
      console.log('ERROR');
    }
  }

}
