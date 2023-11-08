export abstract class Usuario {
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  mail: string;
  imagen: string;
  rol!: string;
  verificado?: boolean;

  constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, imagen: string, verificado?: boolean) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
      this.mail = mail;
      this.imagen = imagen;
      this.verificado = verificado;
  }
}
