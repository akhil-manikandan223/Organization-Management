import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    MatButton
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  constructor(private router: Router) {}

  login() {
      this.router.navigate(['/dashboard']);
  }

}
