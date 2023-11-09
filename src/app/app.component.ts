import { Component } from '@angular/core';
import { SpinnerService } from './core/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clinica-online';

  constructor(private spinner: SpinnerService) {
    this.spinner.mostrar();
    setTimeout(function(){

      spinner.esconder();

    }, 3000);
  }
}
