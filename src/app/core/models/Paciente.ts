import { Usuario } from "./Usuario";

export class Paciente extends Usuario {
  imagenB: string;
  obraSocial: string;

  constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, imagen: string, imagenB: string, obraSocial: string, verificado?: boolean) {
      super(nombre, apellido, edad, dni, mail, imagen, verificado);
      this.imagenB = imagenB;
      this.obraSocial = obraSocial;
      this.rol = 'paciente';
  }
}
