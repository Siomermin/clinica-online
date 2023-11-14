import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  usuarioLogeado: any; // Create a variable to hold user data
  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AuthService) {}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  async ngOnInit() {
    // Use the authService to get the user data
    await this.authService.getUserData()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => {
      if (data) {
        this.usuarioLogeado = data;

        console.log(this.usuarioLogeado);
        // Now 'this.userData' contains the user data
      }
    });
  }
}
