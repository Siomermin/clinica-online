import { Usuario } from "./Usuario";

export class Especialista extends Usuario {
  especialidades: string[];
  habilitado: boolean;

  constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, imagen: string, especialidades: string[], habilitado: boolean = false, verificado?: boolean) {
      super(nombre, apellido, edad, dni, mail, imagen, verificado);
      this.especialidades = especialidades;
      this.habilitado = habilitado;
      this.rol = 'especialista';
  }
}
