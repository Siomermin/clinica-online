import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userData: any; // Create a variable to hold user data

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Use the authService to get the user data
    this.authService.getUserData().subscribe(data => {
      if (data) {
        this.userData = data;

        console.log(this.userData);
        // Now 'this.userData' contains the user data
      }
    });
  }
}
