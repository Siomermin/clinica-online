import { Component } from '@angular/core';
import { slider } from '../../../../core/animations/animations'; // Adjust the path based on your project structure
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  animations: [slider],
})
export class UsuariosComponent {
  getRouterOutletState(outlet: RouterOutlet) {
    const routeData = outlet && outlet.activatedRouteData;
    if (routeData && routeData['animation']) {
      return routeData['animation'];
    }
  }
}
