import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  constructor(private spinner: NgxSpinnerService) {}

  mostrar() {
    this.spinner.show();
  }

  esconder() {
    this.spinner.hide();
  }
}
