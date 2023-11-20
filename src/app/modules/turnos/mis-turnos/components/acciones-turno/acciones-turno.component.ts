import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-acciones-turno',
  templateUrl: './acciones-turno.component.html',
  styleUrls: ['./acciones-turno.component.scss']
})
export class AccionesTurnoComponent {
  @Input() turno: any;


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.turno);
  }
}
